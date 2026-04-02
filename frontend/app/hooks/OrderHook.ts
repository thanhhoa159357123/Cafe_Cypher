"use client";

import { useOrderStore } from "../store/useOrderStore";
import { useCartStore } from "../store/useCartStore";
import { ICreateOrderPayload } from "../types/order";
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
      return {
        success: true,
        data: {
          order_id:
            result?.orderId || result?.data?.orderId || result?.id || "N/A",
        },
      };
    } catch (err: unknown) {
      // Bắt lỗi từ Backend trả về (nếu có)
      const errorMsg =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Thanh toán thất bại, vui lòng kiểm tra lại!";
      toast.error(errorMsg, { id: toastId });

      // 👇 Sửa chỗ này thành return Object
      return { success: false };
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    handleCreateOrder,

    buyNowItem,
    setBuyNowItem,
  };
};
