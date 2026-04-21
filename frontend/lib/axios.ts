import { useAuthStore } from "@/app/store/client/useAuthStore";
import axios from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://cafecypher-backend-production.up.railway.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// TRẠM THU PHÍ TỰ ĐỘNG (Interceptor Request)
axiosClient.interceptors.request.use(
  (config) => {
    let token = null;

    if (!config.url) return config;

    // 1. Tự động thêm Prefix cho Admin API
    const isApiAdminRoute = config.url.includes("admin");
    const adminPrefix = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX;

    if (adminPrefix && isApiAdminRoute && !config.url.includes(adminPrefix)) {
      const cleanUrl = config.url.startsWith("/")
        ? config.url.substring(1)
        : config.url;
      config.url = `${adminPrefix}/${cleanUrl}`;
    }

    // 2. Dùng Link Web Frontend để xác định ai đang gọi API
    const isFrontendAdmin =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin");

    // 3. CHIẾN THUẬT "QUÉT SẠCH LÒNG MỀ": Tìm token bằng mọi giá
    if (isFrontendAdmin) {
      const adminStorage = localStorage.getItem("admin-auth-storage");
      if (adminStorage) {
        try {
          const parsed = JSON.parse(adminStorage);
          // Quét mọi trường hợp Zustand có thể lưu
          token =
            parsed?.state?.access_token ||
            parsed?.state?.token ||
            parsed?.state?.user?.access_token ||
            parsed?.state?.user?.token ||
            parsed?.access_token;
        } catch (e) {}
      }
    } else {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          token =
            parsed?.state?.access_token ||
            parsed?.state?.token ||
            parsed?.state?.user?.access_token ||
            parsed?.access_token;
        } catch (e) {}
      }
    }

    // 4. Dán vé thông hành
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// XỬ LÝ KHI TOKEN HẾT HẠN (Interceptor Response)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const isFrontendAdmin =
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin");

      // NẾU ĐANG Ở TRANG LOGIN MÀ BỊ 401 (Do gõ sai pass) -> KHÔNG ĐÁ GÌ HẾT, ĐỂ FORM TỰ BÁO LỖI
      if (
        typeof window !== "undefined" &&
        window.location.pathname.includes("/management-login")
      ) {
        return Promise.reject(error);
      }

      if (isFrontendAdmin) {
        console.warn(
          "Lỗi 401 Admin: Token die hoặc API từ chối -> Đá về Login Admin!",
        );
        console.warn("Đường dẫn API bị lỗi:", error.config?.url); // In ra để bác biết API nào làm phản

        localStorage.removeItem("admin-auth-storage");
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = "/admin/management-login?key=cafe_cypher_2026";
      } else {
        const authState = useAuthStore.getState();
        if (authState.isAuthenticated) {
          toast.error("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        }
        localStorage.removeItem("auth-storage");
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
