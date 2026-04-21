# ☕ FULLSTACK LARAVEL - NEXTJS CHEAT SHEET

🛠 1. Lệnh Vận Hành Cơ Bản
 Chạy server BE: `php artisan serve`
 Chạy server FE: `pnpm dev`
 Tạo Key (khi mới clone dự án): `php artisan key:generate`
 Mở giao diện tương tác code (Tinker): `php artisan tinker`

🗄 2. Database & Migration (Cực quan trọng)
 Tạo bảng mới: `php artisan make:migration create_xxx_table`
 Đẩy bảng vào DB: `php artisan migrate`
 Chạy toàn bộ Seeder: `php artisan db:seed`
 Chạy đích danh 1 file Seeder cụ thể: `php artisan db:seed --class=TenFileCuThe`
 Sửa file migration xong chạy lại: `php artisan migrate:refresh`
 Xóa sạch DB, chạy lại từ đầu và đổ mẫu: `  `
 Quay lại 1 bước migrate (Rollback): `php artisan migrate:rollback`
 Tạo Resource (Style lại JSON): `php artisan make:resource TenResource`

🏗 3. Tạo Thành Phần Dự Án (Scaffold)
 Model + Migration: `php artisan make:model Name -m`
 Model + Migration + Controller + Seeder: `php artisan make:model Name -mcrfs` (Lệnh "all-in-one" cực nhanh)
 API Controller: `php artisan make:controller Api/NameController --api`
 Request (để check lỗi nhập liệu): `php artisan make:request StoreNameRequest`
 Resource (để định dạng JSON trả về cho NextJS): `php artisan make:resource NameResource`

🔐 4. Authentication (Bảo mật)
 Cài đặt Laravel Sanctum (để NextJS đăng nhập): `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
 Tạo Middleware: `php artisan make:middleware NameMiddleware`

🧹 5. Dọn Dẹp & Tối Ưu
 Xóa toàn bộ cache: `php artisan optimize:clear`
 Hiện danh sách Route để check API: `php artisan route:list`

🎨 6. Lệnh Frontend (NextJS - pnpm)
 Cài thư viện mới: `pnpm add <tên-thư-viện>`
 Cài thư viện dev (như tailwind): `pnpm add -D <tên-thư-viện>`
 Gỡ thư viện: `pnpm remove <tên-thư-viện>`
