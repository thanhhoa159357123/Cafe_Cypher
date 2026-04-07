<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài
use App\Http\Controllers\Controller;
use App\Models\Topping;

class ToppingController extends Controller
{
    /**
     * Lấy danh sách tất cả topping.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        $toppings = Topping::all();
        return response()->json($toppings);
    }
}
