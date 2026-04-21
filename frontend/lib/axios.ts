import { useAuthStore } from "@/app/store/client/useAuthStore";
import axios from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", <--- XÓA DÒNG NÀY ĐI
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://cafecypher-backend-production.up.railway.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// TRẠM THU PHÍ TỰ ĐỘNG (Interceptor)
axiosClient.interceptors.request.use(
  (config) => {
    let token = null;

    // 1. Xác định xem đây có phải request tới Admin API không
    // Kiểm tra url có chứa "/admin/" không (không cần bắt đầu bằng /)
    const isAdminApi = config.url && config.url.includes("/admin/");
    const adminPrefix = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX;

    // 2. Tự động thêm Prefix nếu chưa có (Chỉ thêm một lần)
    if (adminPrefix && isAdminApi && !config.url.includes(adminPrefix)) {
      const cleanUrl = config.url.startsWith("/")
        ? config.url.substring(1)
        : config.url;
      config.url = `${adminPrefix}/${cleanUrl}`;
    }

    // 3. Lấy đúng Token
    if (isAdminApi) {
      const adminStorage = localStorage.getItem("admin-auth-storage");
      if (adminStorage) {
        try {
          token = JSON.parse(adminStorage).state.access_token;
        } catch (e) {}
      }
    } else {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          token = JSON.parse(authStorage).state.access_token;
        } catch (e) {}
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// XỬ LÝ KHI TOKEN HẾT HẠN
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Dùng URL gốc để check xem có phải admin bị lỗi không
      const isUrlAdmin = error.config.url.includes("admin");

      if (isUrlAdmin) {
        console.warn("Admin hết hạn - Đá về trang Login Admin");
        localStorage.removeItem("admin-auth-storage");
        if (!window.location.pathname.includes("/management-login")) {
          window.location.href = "/admin/management-login?key=cafe_cypher_2026";
        }
      } else {
        console.warn("Client hết hạn - Đá về trang chủ");
        const authStore = useAuthStore.getState();
        if (authStore.isAuthenticated) {
          toast.error("Phiên làm việc hết hạn.");
        }
        localStorage.removeItem("auth-storage");
        authStore.logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
