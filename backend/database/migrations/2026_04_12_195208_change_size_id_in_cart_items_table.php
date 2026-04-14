<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // Thay đổi cột thành có thể rỗng (nullable)
            $table->unsignedBigInteger('size_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // Trả lại về trạng thái bắt buộc (không null) nếu có quay xe
            $table->unsignedBigInteger('size_id')->nullable(false)->change();
        });
    }
};
