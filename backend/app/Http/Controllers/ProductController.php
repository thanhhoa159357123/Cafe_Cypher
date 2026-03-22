<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Lấy danh sách sản phẩm (Kèm theo category, size và topping nếu có)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProducts()
    {
        // Eager loading 'category' và 'toppings' để tránh lỗi N+1 (lag database)
        $products = Product::with(['category', 'sizes', 'toppings'])->get();
        return ProductResource::collection($products);
    }
}
