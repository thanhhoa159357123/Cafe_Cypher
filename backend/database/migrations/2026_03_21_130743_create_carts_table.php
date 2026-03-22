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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            // Nối với User, xóa User thì xóa Cart
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Dùng bigInteger hoặc decimal(15, 0) cho tiền Việt (không có xu)
            // 15 chữ số là đủ để ông giáo bán cafe cho cả hành tinh luôn!
            $table->decimal('total_price', 15, 0)->default(0);

            // Thêm trạng thái để quản lý
            // active: đang mua, completed: đã thanh toán, abandoned: giỏ hàng bị bỏ quên
            $table->string('status')->default('active')->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
