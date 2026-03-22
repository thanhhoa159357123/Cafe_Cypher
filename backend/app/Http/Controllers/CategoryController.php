<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

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
