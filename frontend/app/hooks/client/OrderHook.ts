"use client";

import { useOrderStore } from "../../store/client/useOrderStore";
import { useCartStore } from "../../store/client/useCartStore";
import { ICreateOrderPayload } from "../../types/client/order";
import { toast } from "sonner";
import { useEffect } from "react";

export const useOrderHook = () => {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    buyNowItem,
    setBuyNowItem,
    cancelOrder,
  } = useOrderStore();
  const { fetchCart } = useCartStore(); // Import quản lý giỏ hàng

  useEffect(() => {
    fetchOrders();
  }, []); // <-- Chỉ chạy 1 lần khi component mount

  const handleCreateOrder = async (payload: ICreateOrderPayload) => {
    const toastId = toast.loading("Đang xử lý đơn hàng...");
    try {
      // 1. Gọi API tạo đơn hàng (Hứng kết quả trả về từ Backend)
      const result = await createOrder(payload);

      // 2. Dọn dẹp Store
      if (payload.checkout_type === "cart") {
        await fetchCart();
      }

      // 3. Thông báo thành công rực rỡ (Cái này của Hook)
      toast.success("Đặt hàng thành công! 🎉", { id: toastId });

      // 👇 ĐÂY LÀ CHỖ QUYẾT ĐỊNH: Phải return Object chứa success: true và order_id
      // (Dựa theo code BE NestJS đợt trước, nó trả về trường 'orderId')
      const safeResult = result as any;
      return {
        success: true,
        data: {
          order_id:
            safeResult?.orderId || safeResult?.data?.orderId || safeResult?.id || "N/A",
        },
      };
    } catch (err: unknown) {
      const errorResponse = (err as { response?: { status?: number; data?: { message?: string } } }).response;
      // 👇 Thêm case bắt đích danh lỗi 401 (chưa đăng nhập / mất session)
      if (errorResponse?.status === 401) {
        toast.error("Hãy đăng nhập để tiếp tục thanh toán!", { id: toastId });
        return { success: false };
      }

      // Bắt lỗi từ Backend trả về (nếu có)
      const errorMsg =
        errorResponse?.data?.message ||
        "Thanh toán thất bại, vui lòng kiểm tra lại!";
      toast.error(errorMsg, { id: toastId });

      // 👇 Sửa chỗ này thành return Object
      return { success: false };
    }
  };

  const handleCancelOrder = async (orderId: number, reason?: string) => {
    const toastId = toast.loading("Đang xử lý hủy đơn hàng...");
    try {
      await cancelOrder(orderId, reason);
      toast.success("Hủy đơn hàng thành công!", { id: toastId });
      return { success: true };
    } catch (err: unknown) {
      const errorResponse = (err as { response?: { data?: { message?: string } } }).response;
      const errorMsg =
        errorResponse?.data?.message ||
        "Hủy đơn hàng thất bại, vui lòng hệ quản trị viên!";
      toast.error(errorMsg, { id: toastId });
      return { success: false };
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    handleCreateOrder,
    handleCancelOrder,

    buyNowItem,
    setBuyNowItem,
  };
};
