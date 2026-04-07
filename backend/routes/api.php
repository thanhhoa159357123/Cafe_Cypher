<?php

use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\CategoryController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\ProductController;

// Phải Import thêm Controller của Admin (Bác sẽ tạo thư mục Admin sau)
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\SizeController as AdminSizeController;
use App\Http\Controllers\Admin\ToppingController as AdminToppingController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ==========================================
// 1. PUBLIC ROUTES (Ai cũng xem được)
// ==========================================
Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories');
Route::get('/products', [ProductController::class, 'getProducts'])->name('products');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// ==========================================
// 2. PROTECTED ROUTES (Bắt buộc đăng nhập)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {

    // --- Dùng chung cho mọi Role (Đã login là dùng được) ---
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/update-info', [AuthController::class, 'updateInformation']);
    Route::put('/user/change-password', [AuthController::class, 'changePassword']);



    // ==========================================
    // KHU VỰC CỦA CLIENT (Người dùng mua hàng)
    // ==========================================
    Route::middleware('role:client,staff,admin')->group(function () {

        // Nhóm Cart
        Route::controller(CartController::class)->prefix('cart')->group(function () {
            Route::get('/', 'getCart');
            Route::post('/', 'addToCart');
            Route::put('/{itemId}', 'updateCartItem');
            Route::delete('/{itemId}', 'removeFromCart');
        });

        // Nhóm Order (Chỉ xem/tạo đơn hàng CỦA CHÍNH MÌNH)
        Route::controller(OrderController::class)->prefix('order')->group(function () {
            Route::get('/', 'getOrder');
            Route::post('/', 'createOrder');
        });
    });


    // ==========================================
    // KHU VỰC CỦA ADMIN & STAFF (Quản trị viên)
    // ==========================================
    Route::middleware('role:admin,staff')->prefix('admin')->group(function () {

        // Quản lý Danh mục (Thêm, Sửa, Xóa)
        Route::controller(AdminCategoryController::class)->prefix('categories')->group(function () {
            Route::get('/', 'getCategories'); // <- THÊM GET DANH SÁCH CHO ADMIN CŨNG TỐT NÈ
            Route::post('/', 'createCategory');
            Route::put('/{category}', 'updateCategory'); // Dùng {category}
            Route::delete('/{category}', 'deleteCategory'); // Dùng {category}
        });

        // Quản lý Sản phẩm (Thêm, Sửa, Xóa)
        Route::controller(AdminProductController::class)->prefix('products')->group(function () {
            Route::get('/', 'getProducts'); // <- THÊM GET DANH SÁCH CHO ADMIN CŨNG TỐT NÈ
            // Route::post('/', 'createProduct');
            // Route::put('/{product}', 'updateProduct'); // Dùng {product}
            // Route::delete('/{product}', 'deleteProduct'); // Dùng {product}
        });

        // Quan lý Size (Xem TẤT CẢ size)
        Route::controller(AdminSizeController::class)->prefix('sizes')->group(function () {
            Route::get('/', 'getSizes');
        });

        // Quản lý Topping (Xem TẤT CẢ topping)
        Route::controller(AdminToppingController::class)->prefix('toppings')->group(function () {
            Route::get('/', 'getToppings');
        });

        // Quản lý Đơn hàng (Xem TẤT CẢ đơn hàng, duyệt đơn)
        Route::controller(AdminOrderController::class)->prefix('orders')->group(function () {
            Route::get('/', 'getAllOrders'); // Khác với getOrder của Client nhé
            Route::put('/{id}/status', 'updateOrderStatus');
        });
    });
});
