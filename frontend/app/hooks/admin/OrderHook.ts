"use client";

import { useOrderStore } from "@/app/store/admin/useOrderStore";
import { IAdminOrder } from "@/app/types/admin/order";
import { useEffect, useState } from "react";
// Thêm toast để báo lỗi mượt mà
import { toast } from "sonner";

export const OrderHook = () => {
  const {
    orders,
    loading: isFetchingOrders, // Rename để dễ biết đây là loading của cái bảng danh sách
    error,
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
  } = useOrderStore();
  console.log("Ỏder", orders);

  const [selectedOrder, setSelectedOrder] = useState<IAdminOrder | null>(null);
  // Khai báo loading CỤC BỘ chỉ dành riêng cho việc lấy chi tiết / update
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewOrderDetails = async (orderId: number) => {
    setIsActionLoading(true); // Chỉ bật loading cục bộ
    try {
      const orderDetails = await fetchOrderById(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error(
        `Failed to fetch order details for order ${orderId}:`,
        error,
      );
      toast.error("Không thể lấy chi tiết đơn hàng"); // Báo lỗi nhẹ nhàng góc màn hình
    } finally {
      setIsActionLoading(false); // Tắt loading cục bộ
    }
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleUpdateOrderStatus = async (
    orderId: number,
    newStatus: string,
    cancelReason?: string,
  ) => {
    setIsActionLoading(true);
    try {
      // 1. Chỉ gọi API một lần duy nhất
      await updateOrderStatus(orderId, newStatus, cancelReason);

      // 2. Map trạng thái với câu thông báo tương ứng
      const statusMessages: Record<string, string> = {
        processing:
          "Đã xác nhận đơn hàng! Đơn sẽ được chuyển sang trạng thái 'Đang pha chế'.",
        shipping:
          "Đơn hàng đang được giao! Đơn sẽ được chuyển sang trạng thái 'Đang giao hàng'.",
        completed:
          "Đơn hàng đã hoàn thành! Đơn sẽ được chuyển sang trạng thái 'Hoàn thành'.",
        cancelled:
          "Đơn hàng đã bị hủy! Đơn sẽ được chuyển sang trạng thái 'Đã hủy'.",
      };

      // 3. Hiển thị Toast
      const message =
        statusMessages[newStatus] || "Đã cập nhật trạng thái đơn hàng!";
      toast.success(message);
    } catch (error) {
      console.error(
        `Failed to update order status for order ${orderId}:`,
        error,
      );
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    } finally {
      setIsActionLoading(false);
    }
  };

  return {
    orders,
    selectedOrder,
    isFetchingOrders, // Trả ra để quay spinner ở bảng
    error,
    isActionLoading, // Trả ra để quay spinner ở nút bấm "Xem" hoặc trong Modal
    handleViewOrderDetails,
    handleCloseDetails,
    updateOrderStatus,
  };
};
