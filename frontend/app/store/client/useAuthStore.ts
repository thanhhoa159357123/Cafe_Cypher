import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "../../types/auth";
import {
  login,
  register,
  logout,
  updateInformation,
  getMe,
} from "@/app/services/client/authService";
import { useCartStore } from "./useCartStore";
import Cookie from "js-cookie";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      token_type: null,
      isAuthenticated: false,

      fetchUser: async () => {
        try {
          const response = await getMe();
          set({
            user: {
              last_name: response.last_name,
              first_name: response.first_name,
              email: response.email,
              role: response.role,
            },
            isAuthenticated: true,
          });

          Cookie.set("user_role", response.role, { expires: 7 });
        } catch (error) {
          console.error("Fetch user failed:", error);
          // Nếu lỗi (ví dụ: token hết hạn), thì xóa luôn thông tin đăng nhập để tránh trạng thái lỗi lặp lại
          // XÓA COOKIE khi token hết hạn hoặc lỗi xác thực
          Cookie.remove("auth_token");
          Cookie.remove("user_role");
          set({
            user: null,
            access_token: null,
            token_type: null,
            isAuthenticated: false,
          });
        }
      },

      login: async (email, password) => {
        try {
          const response = await login({ email, password });
          Cookie.set("auth_token", response.access_token, { expires: 7 });
          Cookie.set("user_role", response.user.role, { expires: 7 });
          set({
            user: {
              last_name: response.user.last_name,
              first_name: response.user.first_name,
              email: response.user.email,
              role: response.user.role,
            },
            access_token: response.access_token,
            token_type: response.token_type,
            isAuthenticated: true,
          });
          if (response.user.role === "client") {
            useCartStore.getState().fetchCart();
          } else {
            window.location.href = "/admin-dashboard"; // Chuyển hướng admin sau khi login thành công
          }
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      register: async (last_name, first_name, email, password) => {
        try {
          const response = await register({
            last_name,
            first_name,
            email,
            password,
          });
          return response;
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      logout: async () => {
        const currentToken = get().access_token;
        if (currentToken) {
          try {
            await logout(); // Đợi BE xóa token thành công
          } catch (error) {
            // Nếu lỗi 401 (token đã chết sẵn) thì cứ im lặng mà đi tiếp, không throw error
            console.warn(
              "Lỗi khi logout Backend, nhưng vẫn sẽ xóa local state.",
            );
          }
        }

        // DỌN SẠCH COOKIE KHI LOGOUT
        Cookie.remove("auth_token");
        Cookie.remove("user_role");

        // 2. LUÔN LUÔN dọn dẹp State ở Client (Dù BE có lỗi hay không)
        set({
          user: null,
          access_token: null,
          token_type: null,
          isAuthenticated: false,
        });
      },

      updateUser: async (data: {
        first_name: string;
        last_name: string;
        email: string;
      }) => {
        const currentToken = get().access_token;
        if (!currentToken) {
          console.warn(
            "Không thể cập nhật thông tin người dùng vì không có token hợp lệ.",
          );
          throw new Error("Phiên đăng nhập không hợp lệ");
        }

        try {
          // 1. Gọi API trực tiếp từ Store
          const response = await updateInformation(data);

          // 2. BE báo OK và trả về user mới -> Nạp vào RAM
          if (response.user) {
            set({ user: response.user });
          }
        } catch (error) {
          console.error("Update profile failed:", error);
          throw error; // Ném lỗi ra để Hook hứng và hiện Toast
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
