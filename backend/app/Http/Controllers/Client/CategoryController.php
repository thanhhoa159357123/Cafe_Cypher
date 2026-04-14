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
        // Lấy category cha anctive và load các category con cũng phải active
        $categories = Category::whereNull('parent_id')
            ->where('status', 'active')
            ->with(['children' => function ($query) {
                $query->where('status', 'active');
            }])
            ->get();

        return CategoryResource::collection($categories);
    }
}
