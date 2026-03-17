import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Dùng IP cho chắc cú bác nhé
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// TRẠM THU PHÍ TỰ ĐỘNG (Interceptor)
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (Bác nhớ lúc login xong phải lưu vào đây nhé)
    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

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

// XỬ LÝ KHI TOKEN HẾT HẠN (Tùy chọn)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu Laravel báo 401 (Token lỏ hoặc hết hạn), sút user ra trang login luôn
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
