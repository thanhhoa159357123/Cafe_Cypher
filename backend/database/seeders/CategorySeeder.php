<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Tạo category cha
        $ca_phe = Category::create([
            'name' => 'Cà phê',
            'slug' => 'ca-phe',
        ]);
        $tra = Category::create([
            'name' => 'Trà',
            'slug' => 'tra',
        ]);
        $do_an = Category::create([
            'name' => 'Đồ ăn',
            'slug' => 'do-an',
        ]);

        // Tạo category con cho category cha "Cà phê"
        Category::create([
            'name' => "Espresso",       
            'slug' => 'espresso',
            'parent_id' => $ca_phe->id,
        ]);
        Category::create([
            'name' => "Americano",
            'slug' => 'americano',
            'parent_id' => $ca_phe->id,
        ]);
        Category::create([
            'name' => "Latte",
            'slug' => 'latte',
            'parent_id' => $ca_phe->id,
        ]);
        Category::create([
            'name' => "Frappe-Frappe",
            'slug' => 'frappe-frappe',
            'parent_id' => $ca_phe->id,
        ]);
        Category::create([
            'name' => 'Phin Việt Nam',
            'slug' => 'phin-viet-nam',
            'parent_id' => $ca_phe->id,
        ]);
        Category::create([
            "name" => "Cold Brew",
            "slug" => "cold-brew",
            "parent_id" => $ca_phe->id,
        ]);

        // Tạo category con cho category cha "Trà"
        Category::create([
            "name" => "Matcha Tây Bắc",
            'slug' => 'matcha-tay-bac',
            "parent_id" => $tra->id,
        ]);
        Category::create([
            "name" => "Trà Trái Cây",
            'slug' => 'tra-trai-cay',
            "parent_id" => $tra->id,
        ]);
        Category::create([
            "name" => "Trà Sữa",
            'slug' => 'tra-sua',
            "parent_id" => $tra->id,
        ]);
        Category::create([
            "name" => "Chocolate",
            'slug' => 'chocolate',
            "parent_id" => $tra->id,
        ]);

        // Tạo category con cho category cha "Đồ ăn"
        Category::create([
            "name" => "Bánh ngọt",
            'slug' => 'banh-ngot',
            "parent_id" => $do_an->id,
        ]);
        Category::create([
            "name" => "Bánh mặn",
            'slug' => 'banh-man',
            "parent_id" => $do_an->id,
        ]);
        Category::create([
            'name' => 'Pasta',
            'slug' => 'pasta',
            "parent_id" => $do_an->id,
        ]);
        Category::create([
            'name' => 'Salad',
            'slug' => 'salad',
            "parent_id" => $do_an->id,
        ]);
        Category::create([
            'name' => "Pizza",
            'slug' => 'pizza',
            "parent_id" => $do_an->id,
        ]);
    }
}
