import { IOrder } from "../base/order";
import { PaginationMeta } from "./product";

export interface IAdminOrder extends IOrder {
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
  meta: PaginationMeta | null;

  fetchOrders: (page?: number) => Promise<void>;
  fetchOrderById: (orderId: number) => Promise<IAdminOrder | null>;
  updateOrderStatus: (
    orderId: number,
    newStatus: string,
    cancelReason?: string,
  ) => Promise<void>;
  filterOrders: (data: any) => Promise<void>;
}
