<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function getCategories()
    {
        // Nhốt Category 1 tiếng
        $categories = Cache::remember('client_categories_active', 3600, function () {
            return Category::whereNull('parent_id')
                ->where('status', 'active')
                // 1. Chỉ lấy danh mục cha nếu nó có sản phẩm (trực tiếp) HOẶC có danh mục con chứa sản phẩm
                ->where(function ($query) {
                    $query->whereHas('products', function ($productQuery) {
                        $productQuery->where('status', 'active');
                    })->orWhereHas('children', function ($childQuery) {
                        $childQuery->where('status', 'active')
                            ->whereHas('products', function ($productQuery) {
                                $productQuery->where('status', 'active');
                            });
                    });
                })
                // 2. Chỉ truy vấn các danh mục con nếu bản thân danh mục con đó có sản phẩm
                ->with(['children' => function ($query) {
                    $query->where('status', 'active')
                        ->whereHas('products', function ($productQuery) {
                            $productQuery->where('status', 'active');
                        });
                }])->get();
        });

        return CategoryResource::collection($categories);
    }
}
