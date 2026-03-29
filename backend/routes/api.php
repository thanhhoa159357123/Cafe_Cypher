<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;


Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories');
Route::get('/products', [ProductController::class, 'getProducts'])->name('products');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


// Dùng middleware auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // Gom nhóm Controller và Prefix cho Cart
    Route::controller(CartController::class)->prefix('cart')->group(function () {
        Route::get('/', 'getCart');                      // GET /api/cart
        Route::post('/', 'addToCart');                   // POST /api/cart
        Route::put('/{itemId}', 'updateCartItem'); // PUT /api/cart/{itemId}
        Route::delete('/{itemId}', 'removeFromCart'); // DELETE /api/cart/{itemId}
    });

    // Gom nhóm Controller và Prefix cho Order
    Route::controller(OrderController::class)->prefix('order')->group(function () {
        Route::get('/', 'getOrder');                      // GET /api/order
        Route::post('/', 'createOrder');                   // POST /api/order
    });
});
