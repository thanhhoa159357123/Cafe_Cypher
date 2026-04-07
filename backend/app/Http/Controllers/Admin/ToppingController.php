<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Topping;
use Illuminate\Http\Request;

class ToppingController extends Controller
{
    /**
     * Lấy danh sách tất cả các topping
     */
    public function getToppings()
    {
        $toppings = Topping::all();
        return response()->json($toppings);
    }
}
