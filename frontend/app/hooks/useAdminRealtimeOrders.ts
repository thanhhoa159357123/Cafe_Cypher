import { useEffect } from "react";
import { toast } from "sonner";
import { useOrderStore } from "@/app/store/admin/useOrderStore";
import { useAdminAuthStore } from "@/app/store/admin/useAdminAuthStore";
import echo from "@/lib/echo";

export const useAdminRealtimeOrders = () => {
  const { addNotification, currentPage, filterParams, refreshOrders } =
    useOrderStore();
  const { user } = useAdminAuthStore();

  useEffect(() => {
    if (!user || !echo) return;

    const channel = echo.channel("admin-orders");

    channel.listen(".new-order", (data: any) => {
      const order = data.order;

      // Tạo nội dung thông báo
      const title = `🔔 Đơn hàng mới: ${order.order_number}`;
      const description = `Khách: ${order.customer_name} - 💰 ${order.total_price.toLocaleString()}đ`;

      // 1. Toast nổ trên màn hình
      toast.success(title, {
        description: description,
        duration: 5000,
        position: "top-center",
      });

      // 2. Lưu vào mục thông báo Navbar (Cấu trúc mới)
      addNotification({
        title: title,
        description: description,
        type: "order",
      });

      // 3. Âm thanh
      try {
        const audio = new Audio(
          "https://raw.githubusercontent.com/ThanhHoaLED/notification-sounds/main/ting-ting.mp3",
        );
        audio.play().catch(() => {});
      } catch (error) {}

      // 4. Refresh bảng
      if (currentPage === 1 && !filterParams) {
        refreshOrders();
      }
    });

    return () => {
      echo?.leaveChannel("admin-orders");
    };
  }, [user, currentPage, filterParams, refreshOrders, addNotification]);
};
