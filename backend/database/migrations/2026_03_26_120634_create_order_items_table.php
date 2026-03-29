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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');

            // Giữ lại Product ID để click vào "Xem lại sản phẩm", set null nếu SP bị shop xoá
            $table->foreignId('product_id')->nullable()->constrained()->onDelete('set null');

            // ==== SNAPSHOT DATA (Dữ liệu in chết vào hóa đơn) ====
            $table->string('product_name');
            $table->string('size_name');
            $table->json('toppings')->nullable(); // Lưu mảng TÊN topping: ["Trân châu", "Thạch đào"]

            $table->integer('quantity')->default(1);

            // Giá của 1 sản phẩm (đã cộng tiền size và topping vào)
            $table->decimal('unit_price', 15, 0);

            // Tổng tiền của dòng này = quantity * unit_price (Lưu luôn để tiện truy xuất báo cáo)
            $table->decimal('total_price', 15, 0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
