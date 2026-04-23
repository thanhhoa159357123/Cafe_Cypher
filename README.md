# ☕ Cafe_Cypher

> Một hệ thống quản lý và đặt hàng cafe trực tuyến hiện đại, ứng dụng kiến trúc Decoupled (Laravel API & NextJS Frontend) kết hợp xử lý thời gian thực.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Laravel Reverb](https://img.shields.io/badge/Laravel_Reverb-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Live Demo & Giới thiệu
- **Frontend Live Demo:** [https://cafe-cypher.vercel.app/](https://cafe-cypher.vercel.app/)
- **Vai trò dự án:** Solo Fullstack Developer (Tự nghiên cứu, thiết kế database, phát triển API và xây dựng giao diện từ con số 0).

---

## 🛠 Tech Stack & Kiến trúc hệ thống

Dự án được xây dựng theo mô hình **Decoupled Architecture**, tách biệt hoàn toàn giao diện người dùng và máy chủ xử lý logic, giao tiếp thông qua RESTful API.

| Thành phần | Công nghệ sử dụng | Mục đích |
| :--- | :--- | :--- |
| **Frontend** | NextJS 16 (App Router), TailwindCSS | Tối ưu hóa SEO (SSR/SSG), quản lý routing linh hoạt và UI/UX mượt mà. |
| **Backend API** | Laravel 12, MySQL | Xây dựng RESTful API chuẩn mực, xử lý logic nghiệp vụ và quản lý Database. |
| **Real-time** | Laravel Reverb (WebSockets) | Đồng bộ trạng thái đơn hàng ngay lập tức giữa Client và Admin Dashboard. |
| **Deployment** | Vercel, Railway, Docker | Quản lý môi trường CI/CD cơ bản và đưa ứng dụng lên cloud. |

---

## 🧠 Technical Highlights & Điểm nhấn kỹ thuật
- **Tích hợp WebSockets:** Thiết lập thành công Laravel Reverb để đẩy sự kiện (broadcast events) realtime khi có đơn hàng mới, giảm tải việc Client phải gọi API liên tục (polling).
- **Quản lý State & API Fetching:** Ứng dụng hiệu quả các Hook của React/NextJS để quản lý giỏ hàng cục bộ và đồng bộ với server một cách mượt mà.
- **Bảo mật & Phân quyền:** Phân tách rõ ràng luồng Authentication cho Người dùng (Client) và Quản trị viên (Admin).

---

## 📚 Những gì tôi học được (What I Learned)
Đóng vai trò là dự án cá nhân tâm huyết, Cafe_Cypher giúp tôi củng cố và thực hành các kỹ năng thực tế:
1. Hiểu sâu về cách thiết kế và triển khai luồng giao tiếp giữa **NextJS (Frontend)** và **Laravel (Backend API)**.
2. Nắm bắt cơ chế hoạt động của **WebSockets** để giải quyết bài toán thời gian thực (Real-time).
3. Làm quen với quy trình Deploy một ứng dụng Fullstack lên môi trường Production (Vercel & Railway).
4. Cải thiện tư duy tổ chức thư mục code, quản lý Component và tối ưu trải nghiệm người dùng (UX/UI).

---

## ✨ Tính năng cốt lõi
- ⚡ **Real-time Order System:** Thông báo đơn hàng mới tức thì cho Admin, cập nhật trạng thái đơn (Đang xử lý, Hoàn thành) realtime cho khách hàng.
- 🛒 **Smart Shopping Cart:** Thêm/sửa/xóa sản phẩm, tính toán giá trị đơn hàng linh hoạt dựa trên kích cỡ (Size) và Topping tùy chọn.
- 🛡 **Admin Dashboard:** Cung cấp giao diện quản trị trực quan (CRUD) cho Danh mục, Sản phẩm, Khách hàng và Đơn hàng.
- 📱 **Fully Responsive:** Giao diện hiển thị tốt trên mọi thiết bị (Mobile, Tablet, Desktop).

---
## Database Schema (ERD)
<p align="center">
<img src="https://github.com/user-attachments/assets/7d91a4a8-bfb7-416d-b143-494248f2fefe" alt="Sơ đồ ERD dự án Cafe_Cypher" width="100%" />
</p>

**Phân tích logic thiết kế:**
- **Mô hình quan hệ (Relational Model):** Sử dụng các bảng trung gian (`product_sizes`, `product_topping`) để giải quyết quan hệ Nhiều-Nhiều (Many-to-Many), cho phép một sản phẩm có nhiều tùy chọn và ngược lại.
- **Quản lý trạng thái đơn hàng:** Tách biệt `cart_items` (giỏ hàng tạm thời) và `order_items` (dữ liệu đơn hàng đã chốt) để lưu trữ lịch sử giao dịch chính xác ngay cả khi thông tin sản phẩm thay đổi theo thời gian.
- **Phân cấp danh mục:** Bảng `categories` hỗ trợ cấu trúc cây (parent/child) giúp mở rộng danh mục sản phẩm linh hoạt.

---

## 📸 Screenshots (Giao diện dự án)

### 🛒 Client Interface (Người dùng)
| Trang chủ | Chi tiết sản phẩm |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/55788ef9-29c4-4819-9b68-a63937fd3b19" width="400" /> | <img src="https://github.com/user-attachments/assets/fdcc6391-a98f-4c55-899d-c5275d9cb5f7" width="400" /> |

| Giỏ hàng | Đặt hàng |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8adc1d24-e626-4382-a5e4-510509c62aa6" width="400" /> | <img src="https://github.com/user-attachments/assets/b7647bf0-66e8-4182-98b5-04ef96eec90e" width="400" /> |

| Lịch sử đơn hàng | Thông tin cá nhân |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/76100cc7-4c6e-4840-86ba-e39092fb7efc" width="400" /> | <img src="https://github.com/user-attachments/assets/7265d176-a554-4b17-a8f7-5775d3b28bdd" width="400" /> |

### ⚙️ Admin Management (Quản trị)
| Dashboard tổng quan | Quản lý đơn hàng |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/e5593b20-32c6-4532-91d6-e7ce5e087c7c" width="400" /> | <img src="https://github.com/user-attachments/assets/7deb21b1-326c-472b-a872-edf445588f2d" width="400" /> |

| Quản lý khách hàng | Quản lý sản phẩm |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/6946a478-f62e-4eca-ac04-9a14be6f7117" width="400" /> | <img src="https://github.com/user-attachments/assets/ea2a2203-52d6-4913-a359-723d6a576c5e" width="400" /> |

---

<details>
<summary><h1>🛠 Click để xem hướng dẫn cài đặt Local (Setup Guide)</h1></summary>

### 1. Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan reverb:start # Để chạy tính năng Real-time
php artisan serve
```

### 2. Frontend (NextJS)
cd frontend

# Chọn lệnh tương ứng với Package Manager bạn đang dùng:

# npm
npm install && npm run dev

# pnpm
pnpm install && pnpm dev

# yarn
yarn install && yarn dev
</details>

---

## 🚀 Future Roadmap (Dự kiến phát triển)
- [ ] 📧 **Email Notification:** Tự động gửi thông báo hóa đơn và trạng thái đơn hàng qua Mail.
- [ ] 📊 **Sales Statistics:** Tích hợp biểu đồ doanh thu chi tiết (Chart.js/Recharts) trong trang Admin.
- [ ] 💳 **Online Payment:** Tích hợp cổng thanh toán VNPay hoặc MoMo.
- [ ] 🔍 **Advanced Filter:** Tìm kiếm và lọc sản phẩm thông minh theo nhiều tiêu chí.

---

## 👨‍💻 Author
**Thanh Hòa**
- 📧 Email: thanhhoa159357123@gmail.com
- 🐙 GitHub: [@thanhhoa159357123](https://github.com/thanhhoa159357123)

---
*Cảm ơn bạn đã ghé thăm dự án! Nếu thấy hữu ích, đừng quên tặng mình 1 ⭐ nhé!*




