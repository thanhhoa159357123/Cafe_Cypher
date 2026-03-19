import { z } from "zod";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  token_type: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    last_name: string,
    first_name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  lastName: z.string().min(1, "Họ là bắt buộc"),
  firstName: z.string().min(1, "Tên là bắt buộc"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type { User, AuthState };
