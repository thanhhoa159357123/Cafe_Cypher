<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Lấy tất cả category cha (parent_id = null) và load luôn category con (children)
        $categories = Category::whereNull('parent_id')->with('children')->get();

        return CategoryResource::collection($categories);
    }
}
