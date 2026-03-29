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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Mã đơn hàng (VD: ORD-20260326-1234) - hiển thị cho khách thay vì ID tự tăng
            $table->string('order_number')->unique();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_price', 15, 0)->default(0);

            // Trạng thái đơn hàng (pending, processing, shipping, completed, cancelled)
            $table->string('status')->default('pending')->index();

            // ==== THÔNG TIN THANH TOÁN ====
            // Phương thức thanh toán: 'cash' (tiền mặt) hoặc 'qr_code' (chuyển khoản)
            $table->string('payment_method')->default('cash');

            // Trạng thái thanh toán: 'unpaid' (chưa trả), 'paid' (đã trả), 'failed' (thất bại)
            $table->string('payment_status')->default('unpaid')->index();

            // Lưu thời điểm thanh toán thành công
            $table->timestamp('paid_at')->nullable();
            // ==============================

            $table->string('shipping_address');
            $table->string('shipping_phone');
            $table->string('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
