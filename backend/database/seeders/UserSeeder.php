<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo 1 tài khoản Admin mẫu
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Cypher',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'), // Mật khẩu bác tự chọn
            'role' => 'admin',
            'status' => 'active'
        ]);

        // Tạo thêm 1 tài khoản Client mẫu để test
        User::create([
            'first_name' => 'Thanh',
            'last_name' => 'Hòa',
            'email' => 'thanhhoa159357123@gmail.com',
            'password' => bcrypt('123456'),
            'role' => 'client',
            'status' => 'active'
        ]);
    }
}
