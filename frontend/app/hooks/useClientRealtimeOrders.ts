import { useEffect } from "react";
import { toast } from "sonner";
import { useOrderStore } from "@/app/store/client/useOrderStore";
import { useAuthStore } from "@/app/store/client/useAuthStore";
import echo from "@/lib/echo";

export const useClientRealtimeOrders = () => {
  const { fetchOrders, addNotification } = useOrderStore();
  // Lấy thêm 'user' để lấy ID so sánh
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user || !echo) return;

    // Lắng nghe chung trên kênh public
    const channel = echo.channel("public-orders");
    channel.listen(".order-status-updated", (data: any) => {
      const order = data.order;

      if (String(order.user_id) !== String(user.id)) {
        console.log(
          `❌ Đơn của user khác (Đơn: ${order.user_id}, Tôi: ${user.id}) -> Bỏ qua`,
        );
        return;
      }

      console.log("✅ ĐÚNG ĐƠN CỦA MÌNH RỒI, TING TING THÔI!");

      let msg = "";
      switch (order.status) {
        case "confirmed":
          msg = `✅ Quán đã xác nhận đơn hàng ${order.order_number}`;
          break;
        case "processing":
          msg = `⏳ Đơn ${order.order_number} đang được quán pha chế...`;
          break;
        case "shipping":
          msg = `🚚 Đơn ${order.order_number} đang trên đường giao đến bạn!`;
          break;
        case "completed":
          msg = `🎉 Đồ uống ${order.order_number} đã giao thành công tới quý khách!`;
          break;
        case "cancelled":
          msg = `❌ Rất tiếc, đơn ${order.order_number} đã bị quán HỦY do: ${order.cancel_reason || "chưa rõ nguyên nhân"}`;
          break;
      }

      if (msg) {
        if (order.status === "cancelled") toast.error(msg);
        else if (order.status === "processing") toast.info(msg);
        else toast.success(msg);

        addNotification(msg);

        // Tự động kéo data mới về để cập nhật giao diện
        fetchOrders();
      }
    });

    return () => {
      console.log("♻️ Đang dọn dẹp kênh");
      echo?.leaveChannel("public-orders");
    };
  }, [isAuthenticated, user, fetchOrders, addNotification, echo]);
};
