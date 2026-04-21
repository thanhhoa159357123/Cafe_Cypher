import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosClient from "@/lib/axios";

interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  full_name: string;
}

interface AdminAuthState {
  user: AdminUser | null;
  access_token: string | null;
  token_type: string | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      token_type: null,
      isAuthenticated: false,

      login: async (data) => {
        try {
          // 1. Lấy prefix từ file .env (nếu không có thì fallback về chữ 'admin' cho khỏi lỗi)
          const adminPrefix =
            process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "admin";

          // 2. Nối prefix vào đường dẫn API
          // Kết quả thực tế nó sẽ gọi: /secret-portal-admin-2026/admin/login
          const response = await axiosClient.post(
            `/${adminPrefix}/admin/login`,
            data,
          );

          set({
            user: response.data.user,
            access_token: response.data.token,
            token_type: "Bearer",
            isAuthenticated: true,
          });

          document.cookie = `auth_token=${response.data.token}; path=/; max-age=604800`;
        } catch (error) {
          throw error;
        }
      },

      logout: async () => {
        try {
          // Thử gọi API xóa token trên server, nếu lỗi thì kệ, vẫn tiến hành xóa state
          await axiosClient.post("/admin/logout");
        } catch (error) {
          console.warn("API logout lỗi nhưng bộ nhớ vẫn sẽ bị xóa");
        }

        set({
          user: null,
          access_token: null,
          token_type: null,
          isAuthenticated: false,
        });
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
    }),
    {
      name: "admin-auth-storage",
    },
  ),
);
