<?php

namespace Database\Seeders;

use App\Models\Topping;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToppingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $toppings = [
            // Nhóm 5.000đ
            ['name' => 'Sữa Tươi', 'price' => 5000],
            ['name' => 'Sữa Yến Mạch', 'price' => 5000],
            ['name' => 'Sữa Đặc', 'price' => 5000],

            // Nhóm 10.000đ
            ['name' => 'Kem Phô Mai Macchiato', 'price' => 10000],
            ['name' => 'Shot Espresso', 'price' => 10000],
            ['name' => 'Hạt Sen', 'price' => 10000],
            ['name' => 'Xốt Caramel', 'price' => 10000],
            ['name' => 'Đào Miếng', 'price' => 10000],
            ['name' => 'Trân châu trắng', 'price' => 10000],
            ['name' => 'Trân Châu Hoàng Kim', 'price' => 10000],
            ['name' => 'Thạch Sương Sáo', 'price' => 10000],
            ['name' => 'Foam Dừa', 'price' => 10000],
            ['name' => 'Hạt Nổ Củ Năng', 'price' => 10000],
            ['name' => 'Hạt Nổ Yến Mạch', 'price' => 10000],
            ['name' => 'Đài Hoa Hibiscus', 'price' => 10000],
        ];

        foreach ($toppings as $topping) {
            Topping::create($topping);
        }
    }
}
