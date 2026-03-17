import { create } from "zustand";
import { AuthState } from "../types/auth";
import { login, register } from "@/app/services/authService";

export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  email: "",
  password: "",
  access_token: localStorage.getItem("token") || "", // Lấy sẵn từ local nếu có
  token_type: localStorage.getItem("token_type") || "Bearer",

  login: async (email: string, password: string) => {
    try {
      const response = await login({ email, password });

      // Lưu token vào local
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("token_type", response.token_type);

      // Cập nhật State: Lưu user và token, bỏ password đi bác
      set({
        email: response.user.email,
        name: response.user.name,
        access_token: response.access_token,
        token_type: response.token_type,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      // Gọi API register ở đây, ví dụ:
      const response = await register({ name, email, password });
      // Sau khi đăng ký thành công, bạn có thể lưu token hoặc thông tin user vào state
      set({ name, email, password });
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  },
}));
