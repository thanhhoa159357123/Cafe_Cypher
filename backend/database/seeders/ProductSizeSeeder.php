<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy toàn bộ Size
        $allSize = Size::pluck('id')->all();

        $products = Product::whereNotIn('id', [1, 3, 4, 6, 8, 18, 19, 20, 26, 27, 28, 34, 36, 39, 41, 45, 49, 50])->get();

        if (empty($allSize)) {
            $this->command->error('Bảng sizes đang trống, hãy tạo size trước!');
            return;
        }
        if (empty($products)) {
            $this->command->error('Bảng products đang trống, hãy tạo product trước!');
            return;
        }
        foreach ($products as $product) {
            $syncData = [];
            $basePrice = $product->price; // Lấy giá gốc của sản phẩm (ví dụ 20.000)

            foreach ($allSize as $sizeId) {
                $finalPrice = $basePrice;

                if ($sizeId == 2) { // Size M
                    $finalPrice += 5000;
                } elseif ($sizeId == 3) { // Size L
                    $finalPrice += 10000;
                }

                $syncData[$sizeId] = ['price' => $finalPrice];
            }

            $product->sizes()->sync($syncData);
        }

        $this->command->info('Đã gán FULL size cho toàn bộ sản phẩm (ngoại trừ ID 1, 3, 4, 6, 8, 18, 19, 20, 26, 27, 28, 34, 36, 39, 41, 45, 49, 50!');
    }
}
