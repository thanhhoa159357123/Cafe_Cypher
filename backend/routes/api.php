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
use App\Http\Controllers\Admin\DashBoardController as AdminDashBoardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;


$adminPrefix = env('ADMIN_ROUTE_PREFIX', 'admin');
// ==========================================
// 1. PUBLIC ROUTES (Ai cũng xem được)
// ==========================================
Route::get('/categories', [CategoryController::class, 'getCategories'])->name('categories');
Route::get('/products', [ProductController::class, 'getProducts'])->name('products');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Admin Public Routes
Route::prefix($adminPrefix)->group(function () {
    Route::post('/admin/login', [AdminController::class, 'login']);
});
// Admin Public Routes
// Route::post('/admin/login', [AdminController::class, 'login'])->middleware('throttle:5,1');
// ==========================================
// 2. PROTECTED ROUTES (Bắt buộc đăng nhập)
// ==========================================
Route::middleware('auth:sanctum')->group(function () use ($adminPrefix) {

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
    Route::middleware('role:client')->group(function () {

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
            Route::put('/{id}/cancel', 'cancelOrder');
        });
    });



    Route::prefix($adminPrefix)->group(function () {

        // ==========================================
        // KHU VỰC CỦA ADMIN & STAFF (Quản trị viên)
        // ==========================================
        Route::middleware('role:admin,staff')->prefix('admin')->group(function () {

            // Đăng xuất cho Admin
            Route::post('/logout', [AdminController::class, 'logout']);

            // Quản lý Người dùng (Xem danh sách khách hàng, nhân viên)
            Route::controller(AdminUserController::class)->prefix('users')->group(function () {
                Route::get('/', 'getUser'); // Xem danh sách user (có thể lọc theo role)
                Route::get('/{id}', 'getUserById')->where('id', '[0-9]+'); // Xem chi tiết user theo ID
                Route::delete('/{id}', 'deleteUser'); // Xóa mềm user
                Route::put('/{id}/restore', 'restoreUser'); // Khôi phục user
                Route::put('/{id}/toggle-status', 'toggleStatus'); // Đổi trạng thái user
            });

            // Quản lý Danh mục (Thêm, Sửa, Xóa)
            Route::controller(AdminCategoryController::class)->prefix('categories')->group(function () {
                Route::get('/', 'getCategories'); // <- THÊM GET DANH SÁCH CHO ADMIN CŨNG TỐT NÈ
                Route::post('/', 'createCategory');
                Route::put('/{category}', 'updateCategory'); // Dùng {category}
                Route::delete('/{category}', 'deleteCategory'); // Dùng {category}
                Route::put('/{category}/toggle-status', 'toggleStatus'); // Route mới để chuyển đổi trạng thái sản phẩm
                Route::put('/{category}/restore', 'restoreCategory'); // Route mới để khôi phục sản phẩm đã xóa mềm
            });

            // Quản lý Sản phẩm (Thêm, Sửa, Xóa)

            Route::controller(AdminProductController::class)->prefix('products')->group(function () {
                Route::get('/', 'getProducts'); // <- THÊM GET DANH SÁCH
                Route::post('/', 'createProduct');
                Route::put('/{product}', 'updateProduct'); // Dùng {product}
                Route::delete('/{product}', 'deleteProduct'); // Dùng {product}
                Route::put('/{product}/toggle-status', 'toggleStatus'); // Route mới để chuyển đổi trạng thái sản phẩm
                Route::put('/{product}/restore', 'restoreProduct'); // Route mới để khôi phục sản phẩm đã xóa mềm
                Route::get('/filtered', 'filterProducts'); // Route để lọc sản phẩm
            });

            // Quản lý Size (CRUD size)
            Route::controller(AdminSizeController::class)->prefix('sizes')->group(function () {
                Route::get('/', 'getSizes');
                Route::post('/', 'createSize');
                Route::put('/{size}', 'updateSize');
                Route::delete('/{size}', 'deleteSize');
                Route::put('/{size}/toggle-status', 'toggleStatus');
                Route::put('/{id}/restore', 'restoreSize');
            });

            // Quản lý Topping (CRUD topping)
            Route::controller(AdminToppingController::class)->prefix('toppings')->group(function () {
                Route::get('/', 'getToppings');
                Route::post('/', 'createTopping');
                Route::put('/{topping}', 'updateTopping');
                Route::delete('/{topping}', 'deleteTopping');
                Route::put('/{topping}/toggle-status', 'toggleStatus');
                Route::put('/{id}/restore', 'restoreTopping');
            });

            // Quản lý Đơn hàng (Xem TẤT CẢ đơn hàng, duyệt đơn)
            Route::controller(AdminOrderController::class)->prefix('orders')->group(function () {
                Route::get('/', 'getAllOrders'); // Khác với getOrder của Client nhé
                Route::get('/{id}', 'getOrder')->where('id', '[0-9]+'); // Xem chi tiết đơn hàng
                Route::put('/{id}/status', 'updateOrderStatus'); // Cập nhật trạng thái đơn hàng (Admin & Staff mới có quyền này)
                Route::get('/filtered', 'filterOrders'); // Route để lọc đơn hàng theo trạng thái, ngày tháng, v.v.
            });

            // Quản lý Dashboard (Chỉ Admin mới có quyền này)
            Route::get('/dashboard', [AdminDashBoardController::class, 'getDashboard'])->middleware('role:admin');
        });
    });
});
