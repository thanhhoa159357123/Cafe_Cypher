<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // 1. Đánh Index cho bảng Orders
        Schema::table('orders', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('created_at'); // Thêm cái này để lọc date_from, date_to cực nhanh
        });

        // 2. Đánh Index cho bảng Products
        Schema::table('products', function (Blueprint $table) {
            $table->index('name');
            $table->index('category_id');
            $table->index('status');
        });

        // 3. Đánh Index cho bảng Users (Phục vụ cho đoạn whereHas tìm tên)
        Schema::table('users', function (Blueprint $table) {
            $table->index('first_name');
            $table->index('last_name');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['order_number']);
            $table->dropIndex(['status']);
            $table->dropIndex(['user_id']);
            $table->dropIndex(['created_at']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['name']);
            $table->dropIndex(['category_id']);
            $table->dropIndex(['status']); // Bổ sung rác cần dọn
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['first_name']);
            $table->dropIndex(['last_name']);
        });
    }
};
