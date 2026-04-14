<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Lấy danh sách sản phẩm (Kèm theo category, size và topping nếu có)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProducts()
    {
        // Thêm ->where('status', 'active') để chỉ lấy sản phẩm đã kích hoạt
        $products = Product::with(['category', 'sizes', 'toppings'])
            ->where('status', 'active')
            ->whereHas('category', function ($query) {
                // 2. Danh mục trực tiếp phải active
                $query->where('status', 'active')
                    // 3. VÀ Danh mục cha (nếu có) cũng phải active
                    ->where(function ($q) {
                        $q->whereNull('parent_id') // Nếu không có cha thì thôi
                            ->orWhereHas('parent', function ($subQ) {
                                $subQ->where('status', 'active'); // Nếu có cha thì cha phải active
                            });
                    });
            })
            ->get();

        return ProductResource::collection($products);
    }
}
