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
                ->with(['children' => function ($query) {
                    $query->where('status', 'active');
                }])->get();
        });

        return CategoryResource::collection($categories);
    }
}
