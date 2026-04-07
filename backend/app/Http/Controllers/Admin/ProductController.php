<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getProducts()
    {
        $products = Product::with(["category", "sizes", "toppings"])->paginate(10);
        return ProductResource::collection($products);
    }
}
