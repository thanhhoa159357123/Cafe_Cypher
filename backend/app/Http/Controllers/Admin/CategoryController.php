<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Lấy danh sách danh mục (Kèm theo category con nếu có)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        // Lấy category cha active và load các category con cũng phải lấy theo withTrashed
        $categories = Category::withTrashed()->whereNull('parent_id')
            ->with(['children' => function ($query) {
                $query->withTrashed();
            }])
            ->get();

        return CategoryResource::collection($categories);
    }

    /**
     * Tạo danh mục mới
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createCategory(Request $request)
    {
        Log::info("Dữ liệu nhận được từ client: " . json_encode($request->all()));
        // 1. Dùng Validation: Tự động trả lỗi 422 nếu sai, không cần if/else thủ công
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name|max:255',
            'parent_id' => 'nullable|exists:categories,id', // Kiểm tra parent_id phải tồn tại trong bảng categories
        ], [
            'name.unique' => 'Tên danh mục này đã tồn tại rồi bác ơi!',
            'parent_id.exists' => 'Danh mục cha không hợp lệ.'
        ]);

        $data['slug'] = Str::slug($data['name']);

        Log::info("Dữ liệu sau khi validate và thêm slug: " . json_encode($data));

        $category = Category::create($data);

        Log::info("Danh mục mới tạo: " . json_encode($category));

        return new CategoryResource($category);
    }

    /**
     * Xóa danh mục
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteCategory(Category $category)
    {
        // 1. Kiểm tra xem danh mục này có chứa danh mục con không
        if ($category->children()->count() > 0) {
            return response()->json([
                'message' => 'Không thể xóa vì danh mục này đang chứa các danh mục con.'
            ], 400); // Trả về 400 Bad Request
        }

        // 2. Kiểm tra xem danh mục có đang chứa sản phẩm không
        if ($category->products()->count() > 0) {
            return response()->json([
                'message' => 'Không thể xóa danh mục này vì đang có sản phẩm liên quan.'
            ], 400);
        }

        $categoryId = $category->id; // Lưu id lại để log
        $category->delete();

        // 3. Sửa lại chữ cho đúng
        Log::info("Đã xóa danh mục ID: " . $categoryId);

        return response()->json(['message' => 'Danh mục đã được xóa thành công.']);
    }

    /**
     * Cập nhật danh mục
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCategory(Request $request, Category $category)
    {

        Log::info("Dữ liệu nhận được từ client: " . json_encode($request->all()));
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')->ignore($category->id),
            ],
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        Log::info("Dữ liệu sau khi validate: " . json_encode($data));

        // Tạo slug từ name mới
        $data['slug'] = Str::slug($data['name']);

        $category->update($data);
        Log::info("Danh mục sau khi cập nhật: " . json_encode($category));

        return new CategoryResource($category);
    }

    /**
     * Ẩn danh mục
     */
    public function toggleStatus(Category $category)
    {
        try {
            $category->status = ($category->status === 'active') ? 'inactive' : 'active';
            $category->save();

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công!',
                'data' => $category // Trả về để FE cập nhật UI ngay lập tức
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi xảy ra, vui lòng thử lại!'], 500);
        }
    }

    /**
     * Khôi phục danh mục đã xóa mềm
     */
    public function restoreCategory($id)
    {
        // Tìm cả trong thùng rác và khôi phục (đưa deleted_at về null)
        $category = Category::withTrashed()->findOrFail($id);
        $category->restore();
        return response()->json(['message' => 'Danh mục đã được khôi phục thành công.']);
    }
}
