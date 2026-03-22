<?php

namespace App\Http\Controllers;

use App\Models\Topping;
use Illuminate\Http\Request;

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
