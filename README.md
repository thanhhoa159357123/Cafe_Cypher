# ☕ Cafe_Cypher

> Một hệ thống quản lý và đặt hàng cafe trực tuyến hiện đại được xây dựng với kiến trúc Decoupled (Laravel API & NextJS Frontend).

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Laravel Reverb](https://img.shields.io/badge/Laravel_Reverb-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![DataGrip](https://img.shields.io/badge/DataGrip-000000?style=for-the-badge&logo=datagrip&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

---

## 🚀 Live Demo

**Frontend:** [https://cafe-cypher.vercel.app/](https://cafe-cypher.vercel.app/)

---

## 🛠 Tech Stack

| Thành phần | Công nghệ sử dụng |
| :--- | :--- |
| **Frontend** | NextJS 16 (App Router), TailwindCSS |
| **Backend** | Laravel 12, MySQL |
| **Real-time** | **Laravel Reverb** (WebSockets) |
| **Deployment** | Vercel (Frontend) & Railway (Backend) |
| **Tools** | Postman, Docker, DataGrip |

---

## 📂 Cấu trúc dự án
- `backend/`: Chứa mã nguồn Laravel 12 API, Database Migrations và Reverb WebSockets.
- `frontend/`: Chứa mã nguồn NextJS 16, sử dụng App Router, Group Router và TailwindCSS.

---


## ✨ Tính năng nổi bật
- ⚡ **Real-time Order:** Hệ thống thông báo và cập nhật đơn hàng tức thì nhờ **Laravel Reverb**.
- 🛡 **Admin Dashboard:** Quản trị toàn diện Sản phẩm, Danh mục, Topping/Size và Khách hàng.
- 🛒 **Shopping Cart:** Trải nghiệm đặt hàng mượt mà, tối ưu UX cho người dùng.
- 📱 **Responsive Design:** Giao diện tối giản, dễ sử dụng.

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




