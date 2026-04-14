<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Bảng Products
        Schema::table('products', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->softDeletes();
        });

        // Bảng Categories
        Schema::table('categories', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->softDeletes();
        });

        // Bảng Sizes
        Schema::table('sizes', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->softDeletes();
        });

        // Bảng Toppings
        Schema::table('toppings', function (Blueprint $table) {
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->softDeletes();
        });

        // Bảng Users (Bảng này chắc ông có role rồi, thêm status thôi)
        Schema::table('users', function (Blueprint $table) {
            $table->enum('status', ['active', 'banned'])->default('active');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['status', 'deleted_at']);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['status', 'deleted_at']);
        });
        Schema::table('sizes', function (Blueprint $table) {
            $table->dropColumn(['status', 'deleted_at']);
        });
        Schema::table('toppings', function (Blueprint $table) {
            $table->dropColumn(['status', 'deleted_at']);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status', 'deleted_at']);
        });
    }
};
