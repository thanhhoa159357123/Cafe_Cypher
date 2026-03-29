"use client";

import { useEffect } from "react";
import Navbar from "./components/items/Navbar";
import { useCartStore } from "./store/useCartStore";
import { useCategoryStore } from "./store/useCategoryStore";
import { Toaster } from "sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { fetchCategories } = useCategoryStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    // Gọi ngay khi app vừa khởi động
    fetchCategories();

    // Nếu app yêu cầu có Token mới lấy được Cart thì Axios Interceptor
    // của bạn sẽ tự động hứng lỗi 401 nếu chưa đăng nhập, không lo nhé!
    fetchCart();

    // Thuận tiện mở rộng: Sau này có fetchUser() thông tin đăng nhập cũng nhét vào đây
  }, []); // Chỉ chạy 1 lần lúc bật web
  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
      <Toaster richColors position="top-center" style={{ zIndex: 9999 }} />
      <Navbar />
      {children}
    </div>
  );
}
