import {
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "@/app/services/admin/orderService";
import { IAdminOrderState } from "@/app/types/admin/order";
import { create } from "zustand";

export const useOrderStore = create<IAdminOrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllOrders();
      set({ orders: response.data });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      set({ error: "Failed to fetch orders" });
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderById: async (orderId) => {
    try {
      const response = await getOrder(orderId);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch order ${orderId}:`, error);
      set({ error: `Failed to fetch order ${orderId}` });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, newStatus, cancelReason?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await updateOrderStatus({
        id: orderId,
        status: newStatus,
        cancel_reason: cancelReason,
      });
      // Sau khi cập nhật trạng thái, bạn có thể muốn refresh lại danh sách đơn hàng
      await get().fetchOrders();
    } catch (error) {
      console.error(`Failed to update order ${orderId} status:`, error);
      set({ error: `Failed to update order ${orderId} status` });
      throw error;
    }
  },
}));
