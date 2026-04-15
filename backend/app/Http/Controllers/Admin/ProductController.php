<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getProducts()
    {
        // Thêm ->where('status', 'active') để chỉ lấy sản phẩm đã kích hoạt
        $products = Product::withTrashed()->with(['category', 'sizes', 'toppings'])
            ->paginate(10);

        return ProductResource::collection($products);
    }

    /**
     * Thêm sản phẩm mới
     *
     *
     */
    public function createProduct(StoreProductRequest $request)
    {
        $validated = $request->validated();
        Log::info("Dữ liệu nhận được từ client (đã validate): ", $validated);

        // --- XỬ LÝ UPLOAD ẢNH LÊN CLOUDINARY ---
        $imageUrl = null;

        // Bạn đang truyền name là "image_url" trên FormRequest
        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('cypher_shop/products', 'cloudinary');

            // Thêm annotation này để VS Code hết báo lỗi ảo
            /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
            $disk = Storage::disk('cloudinary');

            $imageUrl = $disk->url($path);

            Log::info("Upload Cloudinary thành công", ['url' => $imageUrl]);
        }

        // 2. Tạo sản phẩm chính
        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'category_id' => $validated['category_id'],
            'image_url' => $imageUrl, // Lưu URL của Cloudinary thay vì path local
        ]);

        // 3. Liên kết vào bảng product_sizes (kèm pivot price)
        if (!empty($validated['sizes'])) {
            $sizesData = [];
            foreach ($validated['sizes'] as $size) {
                // $size là mảng chứa id và price (ví dụ: ['id' => 1, 'price' => 25000])
                if (isset($size['id']) && isset($size['price'])) {
                    $sizesData[$size['id']] = ['price' => $size['price']];
                }
            }
            $product->sizes()->sync($sizesData);
        }

        // 4. Liên kết vào bảng product_toppings (chỉ nhận array ids)
        if (!empty($validated['toppings'])) {
            $product->toppings()->sync($validated['toppings']);
        }

        return new ProductResource($product->load(['category', 'sizes', 'toppings']));
    }

    /**
     * Xóa sản phẩm
     */
    public function deleteProduct(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Sản phẩm đã được xóa thành công.']);
    }

    /**
     * Cập nhật thông tin sản phẩm (nếu cần)
     */
    public function updateProduct(StoreProductRequest $request, Product $product)
    {
        $validated = $request->validated();
        Log::info("Dữ liệu cập nhật từ client: ", $validated);

        // Mặc định giữ nguyên ảnh cũ nếu không có ảnh mới gửi lên
        $imageUrl = $product->image_url;

        // Nếu client có upload file ảnh mới
        if ($request->hasFile('image_url')) {

            // 1. XÓA ẢNH CŨ trên Cloudinary (nếu sản phẩm đang có ảnh)
            if ($product->image_url) {
                try {
                    $parts = explode('/upload/', $product->image_url);
                    if (isset($parts[1])) {
                        $pathWithVersion = $parts[1];
                        $pathWithoutVersion = preg_replace('/^v\d+\//', '', $pathWithVersion);
                        $publicId = pathinfo($pathWithoutVersion, PATHINFO_DIRNAME) . '/' . pathinfo($pathWithoutVersion, PATHINFO_FILENAME);

                        if (str_starts_with($publicId, './')) {
                            $publicId = substr($publicId, 2);
                        }

                        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
                        $disk = Storage::disk('cloudinary');
                        $disk->delete($publicId);

                        Log::info("Đã xóa ảnh cũ trên Cloudinary để chuẩn bị cập nhật", ['public_id' => $publicId]);
                    }
                } catch (\Exception $e) {
                    Log::error("Lỗi khi xóa ảnh cũ từ Cloudinary: " . $e->getMessage());
                }
            }

            // 2. UPLOAD ẢNH MỚI lên Cloudinary
            $path = $request->file('image_url')->store('cypher_shop/products', 'cloudinary');
            /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
            $disk = Storage::disk('cloudinary');
            $imageUrl = $disk->url($path);
        }

        // Cập nhật thông tin gốc của sản phẩm
        $product->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'category_id' => $validated['category_id'],
            'image_url' => $imageUrl, // Sẽ lấy ảnh mới (nếu có update) hoặc giữ URL cũ
        ]);

        // Đồng bộ sizes (sync sẽ tự động xóa các ID cũ không còn nằm trong danh sách mới)
        if (isset($validated['sizes'])) {
            $sizesData = [];
            foreach ($validated['sizes'] as $size) {
                if (isset($size['id']) && isset($size['price'])) {
                    $sizesData[$size['id']] = ['price' => $size['price']];
                }
            }
            $product->sizes()->sync($sizesData);
        } else {
            // Nếu gửi mảng rỗng (xóa hết size) thì ta tháo liên kết
            $product->sizes()->sync([]);
        }

        // Đồng bộ toppings
        if (isset($validated['toppings'])) {
            $product->toppings()->sync($validated['toppings']);
        } else {
            // Nếu gửi mảng rỗng (xóa hết topping)
            $product->toppings()->sync([]);
        }

        return new ProductResource($product->load(['category', 'sizes', 'toppings']));
    }

    /**
     * Ẩn sản phẩm (cập nhật trường status)
     */
    public function toggleStatus(Product $product)
    {
        try {
            $product->status = ($product->status === 'active') ? 'inactive' : 'active';
            $product->save();

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công!',
                'data' => $product // Trả về để FE cập nhật UI ngay lập tức
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi xảy ra, vui lòng thử lại!'], 500);
        }
    }

    /**
     * Khôi phục sản phẩm đã xóa mềm
     */
    public function restoreProduct($id)
    {
        // Tìm cả trong thùng rác và khôi phục (đưa deleted_at về null)
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();
        return response()->json(['message' => 'Sản phẩm đã được khôi phục thành công.']);
    }

    /**
     * Lọc sản phẩm
     */
    public function filterProducts(Request $request)
    {
        $query = Product::with(['category', 'sizes', 'toppings']);

        $products = $query
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%$search%");
            })
            ->when($request->category_id, function ($q, $categoryId) {
                $q->where('category_id', $categoryId);
            })
            ->when($request->status, function ($q, $status) {
                $q->where('status', $status);
            })
            ->when($request->only_trashed == 'true', function ($q) {
                $q->onlyTrashed();
            })->paginate(10);

        return ProductResource::collection($products);
    }
}
