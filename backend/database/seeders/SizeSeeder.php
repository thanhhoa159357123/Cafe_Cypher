<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $sizes = ['Nhỏ', 'Vừa', 'Lớn'];
        foreach ($sizes as $size) {
            Size::create(['name' => $size]);
        }
    }
}
