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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('image_url');

            // Cột này lưu id của danh mục mà sản phẩm này thuộc về
            // Khi một category bị xóa, tất cả sản phẩm thuộc về category đó cũng sẽ bị xóa theo (cascade)
            // Nếu muốn giữ lại sản phẩm khi category bị xóa, có thể dùng ->nullOnDelete() thay vì ->onDelete('cascade')
            // Nhưng ở trường hợp này, chúng ta sẽ xóa sản phẩm khi danh mục bị xóa, nên sẽ dùng ->onDelete('cascade') và cùng tránh việc sản phẩm bị mồ côi (orphaned) khi category bị xóa
            $table->foreignId('category_id')->constrained()->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
