import { useAuthStore } from "@/app/store/client/useAuthStore";
import axios from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Dùng IP cho chắc cú bác nhé
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// TRẠM THU PHÍ TỰ ĐỘNG (Interceptor)
axiosClient.interceptors.request.use(
  (config) => {
    let token = null;
    let tokenType = "Bearer";

    // ✅ Lấy chuỗi JSON từ Zustand persist storage
    const authStorageStr = localStorage.getItem("auth-storage");

    if (authStorageStr) {
      try {
        // Parse JSON ra object để truy cập vào sâu bên trong
        const authData = JSON.parse(authStorageStr);
        token = authData.state.access_token;
        tokenType = authData.state.token_type || "Bearer";
      } catch (error) {
        console.error("Lỗi parse auth-storage:", error);
      }
    }

    if (token) {
      // Dán "vé thông hành" vào Header
      config.headers.Authorization = `${tokenType} ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// XỬ LÝ KHI TOKEN HẾT HẠN
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      toast.error("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
      // Xóa store của Zustand để app tự log out và không bị lặp loop 401
      localStorage.removeItem("auth-storage");
      useAuthStore.getState().logout();

      console.warn("Lỗi 401: Token không hợp lệ hoặc đã hết hạn!");
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
