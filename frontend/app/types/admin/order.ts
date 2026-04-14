import { IOrder } from "../base/order";

export interface IAdminOrder extends IOrder {
  cancel_reason: string | null; // Lý do hủy đơn (nếu có)
  cancelled_by: string | null;

  // Ở Admin OrderController, bạn có gọi Order::with(['user'])->...
  // Nên data sẽ có thêm thông tin định danh người dùng:
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  } | null;
}

export interface IAdminOrderState {
  orders: IAdminOrder[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: number) => Promise<IAdminOrder | null>;
  updateOrderStatus: (
    orderId: number,
    newStatus: string,
    cancelReason?: string,
  ) => Promise<void>;
}
