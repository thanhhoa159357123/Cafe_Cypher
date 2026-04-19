import { create } from "zustand";
import {
  IBuyNowItemState,
  ICreateOrderPayload,
  IOrderState,
} from "../../types/client/order";
import { cancelOrderService, createOrder, getOrders } from "../../services/client/orderService";

export const useOrderStore = create<IOrderState>((set, get) => ({
  selectedOrder: null,
  isOpen: false,
  openDrawer: (order) => set({ selectedOrder: order, isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),

  // <-- Sửa: Thêm "get"
  loading: false,
  error: null,
  orders: null,

  buyNowItem: null, // <-- Thêm state cho Buy Now
  setBuyNowItem: (item: IBuyNowItemState | null) => set({ buyNowItem: item }), // <-- Thêm setter cho Buy Now

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getOrders();
      // <-- Sửa: Lấy trực tiếp biến response vì bên service đã return data
      set({ loading: false, orders: response.data });
      return response; // <-- Sửa: Trả về response để component gọi có thể dùng
    } catch (error) {
      set({ loading: false, error: "Failed to fetch orders" });
    }
  },

  createOrder: async (data: ICreateOrderPayload) => {
    set({ loading: true, error: null });
    try {
      const response = await createOrder(data);
      // Khi tạo xong 1 order, mảng dĩ nhiên phải update => Nối đơn hàng mới tinh vào danh sách có sẵn
      const currentOrders = get().orders || [];
      set({
        loading: false,
        orders: [response, ...currentOrders], // Bỏ cái response.data đi, dùng thẳng response
        // Tạo thành công xong thì clear luôn cái "két sắt" mua ngay cho đỡ dính rác lần sau
        buyNowItem: null,
      });

      return true;
    } catch (error) {
      set({ loading: false, error: "Failed to create order" });
      throw error; // Nên throw lỗi để phía UI component catch được và báo Toast lỗi
    }
  },

  cancelOrder: async (id: number, reason?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await cancelOrderService(id, { cancel_reason: reason || '' });
      
      const currentOrders = get().orders;
      const updatedOrders = currentOrders ? currentOrders.map(order => 
        order.id === id ? { ...order, status: 'cancelled', cancel_reason: reason } : order
      ) : null;
      
      const currentSelectedOrder = get().selectedOrder;
      const updatedSelectedOrder = currentSelectedOrder?.id === id 
        ? { ...currentSelectedOrder, status: 'cancelled', cancel_reason: reason }
        : currentSelectedOrder;

      set({
        loading: false,
        orders: updatedOrders,
        selectedOrder: updatedSelectedOrder
      });

      return response;
    } catch (error) {
      set({ loading: false, error: "Failed to cancel order" });
      throw error;
    }
  }
}));
