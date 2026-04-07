<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài
use App\Http\Controllers\Controller;

use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Lấy danh sách danh mục (Kèm theo category con nếu có)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        // Lấy tất cả category cha (parent_id = null) và load luôn category con (children)
        $categories = Category::whereNull('parent_id')->with('children')->get();

        return CategoryResource::collection($categories);
    }
}
