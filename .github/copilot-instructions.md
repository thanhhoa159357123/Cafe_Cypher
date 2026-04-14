# 1. QUY TẮC CHUNG (GLOBAL)
- Luôn trả lời kĩ càng và dễ hiểu, cung cấp code trực tiếp, không giải thích dài dòng trừ khi được yêu cầu.
- Nếu code có lỗi, chỉ ra nguyên nhân và đưa ra đoạn code fix ngay lập tức.

# 2. NGỮ CẢNH BACKEND (LARAVEL 12)
> Kích hoạt khi: Đang mở file .php, hoặc prompt có chứa từ "backend", "laravel", "api".
- Code tuân thủ chuẩn PSR-12.
- Controller luôn trả về JSON thông qua `JsonResource` (Trường hợp người dùng tạo file Request thì trả dữ liệu thông qua file Request).
- Validation bắt buộc dùng `FormRequest`, tuyệt đối không validate trực tiếp trong Controller.
- DB Queries ưu tiên Eloquent, dùng Eager Loading (`with`) để tránh N+1.

# 3. NGỮ CẢNH FRONTEND (NEXT.JS 16)
> Kích hoạt khi: Đang mở file .ts, .tsx, hoặc prompt có chứa từ "frontend", "next", "react".
- Bắt buộc dùng App Router, ưu tiên Server Components.
- Styling bằng Tailwind CSS v4, dùng `cn()` (clsx + tailwind-merge) để gộp class.
- Form validation dùng `React Hook Form` kết hợp `Zod`.
- State cục bộ dùng `useState`, state global dùng `Zustand`.
