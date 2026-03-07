<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager loading 'category' và 'toppings' để tránh lỗi N+1 (lag database)
        $products = Product::with(['category', 'sizes'])->get();
        return ProductResource::collection($products);
    }
}
