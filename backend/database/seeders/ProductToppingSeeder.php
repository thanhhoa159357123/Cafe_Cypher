<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Topping;

class ProductToppingSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Lấy tất cả ID của Topping đang có thành một mảng
        $allToppingIds = Topping::pluck('id')->all();

        // 2. Lấy tất cả sản phẩm, TRỪ những thằng có ID từ 18 đến 22
        $products = Product::whereNotIn('id', [18, 19, 20, 21, 22])->get();

        if (empty($allToppingIds)) {
            $this->command->error('Bảng toppings đang trống, hãy tạo topping trước!');
            return;
        }

        foreach ($products as $product) {
            // 3. Gán FULL bộ topping cho sản phẩm này
            // Dùng sync để nếu chạy lại seeder nó không bị trùng dữ liệu
            $product->toppings()->sync($allToppingIds);
        }

        $this->command->info('Đã gán FULL topping cho toàn bộ sản phẩm (ngoại trừ ID 18-22)!');
    }
}
