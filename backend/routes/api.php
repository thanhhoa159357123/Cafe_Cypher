<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
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
        Route::put('/items/{itemId}', 'updateCartItem'); // PUT /api/cart/items/{itemId}
        Route::delete('/items/{itemId}', 'removeFromCart'); // DELETE /api/cart/items/{itemId}
    });
});
