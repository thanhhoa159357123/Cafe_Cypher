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
        // 1. Thêm cột cho bảng Orders
        Schema::table('orders', function (Blueprint $table) {
            $table->string('cancelled_by')->nullable()->after('status')->comment('client hoặc admin');
            $table->string('cancel_reason')->nullable()->after('cancelled_by');
            $table->softDeletes(); // Thêm cột deleted_at
        });

        // 2. Thêm cột
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['cancelled_by', 'cancel_reason']);
            $table->dropSoftDeletes();
        });
    }
};
