<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài
use App\Http\Controllers\Controller;
use App\Models\Size;

class SizeController extends Controller
{
    /**
     * Lấy toàn bộ kích cỡ sản phẩm có trong hệ thống.
     */
    public function index()
    {
        //
        $sizes = Size::all();
        return response()->json($sizes);
    }
}
