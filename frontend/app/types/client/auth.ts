import { z } from "zod";
import { User } from "../base/auth";

interface AuthState {
  user: User | null;
  access_token: string | null;
  token_type: string | null;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    last_name: string,
    first_name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  updateUser: (data: {
    first_name: string;
    last_name: string;
    email: string;
  }) => Promise<void>; // Thêm hàm updateUser để cập nhật thông tin người dùng sau khi chỉnh sửa
}

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .trim()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(passwordRegex, "Mật khẩu không được chứa Tiếng Việt có dấu"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  lastName: z.string().trim().min(1, "Họ là bắt buộc"),
  firstName: z.string().trim().min(1, "Tên là bắt buộc"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .trim()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(
      passwordRegex,
      "Mật khẩu không được chứa Tiếng Việt có dấu hoặc khoảng trắng",
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type { User, AuthState };
