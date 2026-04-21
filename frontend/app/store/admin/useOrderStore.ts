import {
  filterOrders,
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
  meta: null,
  currentPage: 1,
  filterParams: null,

  setCurrentPage: (page) => set({ currentPage: page }),
  setFilterParams: (params) => set({ filterParams: params }),

  refreshOrders: async () => {
    const { currentPage, filterParams, fetchOrders, filterOrders } = get();
    if (filterParams) {
      // Gọi ở chế độ silent=true để table không bị chớp giật
      await filterOrders({ ...filterParams, page: currentPage }, true);
    } else {
      await fetchOrders(currentPage, true);
    }
  },

  // Real-time Notification Storage
  unreadCount: 0,
  notifications: [],

  addNotification: (data) => {
    set((state) => ({
      unreadCount: state.unreadCount + 1,
      notifications: [
        {
          id: Date.now(),
          title: data.title,
          description: data.description,
          type: data.type || "info",
          time: new Date(),
        },
        ...state.notifications,
      ].slice(0, 20),
    }));
  },

  clearUnread: () => set({ unreadCount: 0 }),

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  fetchOrders: async (page = 1, isSilent = false) => {
    if (!isSilent) set({ loading: true, error: null });
    try {
      const response = await getAllOrders(page);
      set({
        orders: response.data,
        meta: response.meta || response,
      });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      if (!isSilent) set({ error: "Failed to fetch orders" });
    } finally {
      if (!isSilent) set({ loading: false });
    }
  },

  fetchOrderById: async (orderId) => {
    set({ loading: true, error: null });
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
      // Thay vì gọi get().fetchOrders(1) thì ta sử dụng refreshOrders để tôn trọng Filter và Trang hiện tại của người dùng
      await get().refreshOrders();
    } catch (error) {
      console.error(`Failed to update order ${orderId} status:`, error);
      set({
        error: `Failed to update order ${orderId} status`,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  filterOrders: async (data, isSilent = false) => {
    if (!isSilent) set({ loading: true, error: null });
    try {
      const response = await filterOrders(data);
      set({
        orders: response.data,
        meta: response.meta || response,
      });
    } catch (error) {
      console.error("Failed to filter orders:", error);
      if (!isSilent) set({ error: "Failed to filter orders" });
    } finally {
      if (!isSilent) set({ loading: false });
    }
  },
}));
