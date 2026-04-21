<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function getProducts()
    {
        // Nhốt Menu 1 tiếng (3600s)
        $products = Cache::remember('client_products_active', 3600, function () {
            return Product::with(['category', 'sizes', 'toppings'])
                ->where('status', 'active')
                ->whereHas('category', function ($query) {
                    $query->where('status', 'active')
                        ->where(function ($q) {
                            $q->whereNull('parent_id')
                                ->orWhereHas('parent', function ($subQ) {
                                    $subQ->where('status', 'active');
                                });
                        });
                })->get();
        });

        return ProductResource::collection($products);
    }
}
