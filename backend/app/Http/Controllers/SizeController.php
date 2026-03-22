<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

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
