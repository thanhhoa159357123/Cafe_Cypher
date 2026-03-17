<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;


Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
Route::get('/products', [ProductController::class, 'index'])->name('products');

Route::post('/register', [AuthController::class, 'register']);
// Route::post('/register', function (Request $request) {
//     // In thẳng dữ liệu Postman gửi lên
//     dd([
//         'thong_bao' => 'Đã đi vào được Route API!',
//         'du_lieu_postman_gui' => $request->all()
//     ]);
// });
Route::post('/login', [AuthController::class, 'login']);

// Dùng middleware auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
