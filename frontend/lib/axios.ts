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

    // 1. Chỉ dùng URL API để quyết định xem CÓ NỐI PREFIX ADMIN không
    // Lúc này bỏ luôn mấy cái check "config.url &&" vì ở trên đã lọc rồi
    const isApiAdminRoute = config.url.includes("admin");
    const adminPrefix = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX;

    if (adminPrefix && isApiAdminRoute && !config.url.includes(adminPrefix)) {
      const cleanUrl = config.url.startsWith("/")
        ? config.url.substring(1)
        : config.url;
      config.url = `${adminPrefix}/${cleanUrl}`;
    }

    // 2. BIỆN PHÁP CHỐT HẠ: Dùng Link Web Frontend để xác định ai đang gọi API
    // Nếu trình duyệt đang mở trang /admin/... thì chắc chắn là Admin
    const isFrontendAdmin =
      typeof window !== "undefined" &&
      window.location.pathname.includes("/admin");

    if (isFrontendAdmin) {
      // Đang ở Admin -> Chỉ lấy Token Admin
      const adminStorage = localStorage.getItem("admin-auth-storage");
      if (adminStorage) {
        try {
          token = JSON.parse(adminStorage).state.access_token;
        } catch (e) {}
      }
    } else {
      // Đang ở Web khách hàng -> Chỉ lấy Token Client
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

// XỬ LÝ KHI TOKEN HẾT HẠN (Interceptor Response)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Lại dùng Frontend URL để biết đường đá người dùng về đâu
      const isFrontendAdmin =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/admin");

      if (isFrontendAdmin) {
        console.warn("Lỗi 401 Admin: Token không hợp lệ -> Đá về Login Admin!");
        localStorage.removeItem("admin-auth-storage");
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        if (!window.location.pathname.includes("/management-login")) {
          window.location.href = "/admin/management-login?key=cafe_cypher_2026";
        }
      } else {
        console.warn("Lỗi 401 Client: Token không hợp lệ -> Đá về trang chủ!");
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
