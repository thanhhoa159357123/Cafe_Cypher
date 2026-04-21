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

export interface INotification {
  id: number;
  title: string;
  description: string;
  type: "order" | "cancel" | "info" | "success" | "error"; // Phân loại để sau này bác đổi màu icon cho đẹp
  time: Date;
}

export interface IAdminOrderState {
  orders: IAdminOrder[];
  loading: boolean;
  error: string | null;
  meta: PaginationMeta | null;
  currentPage: number;
  filterParams: any | null;

  setCurrentPage: (page: number) => void;
  setFilterParams: (params: any | null) => void;
  refreshOrders: () => Promise<void>;

  // Real-time Notification State
  unreadCount: number;
  notifications: INotification[]; // Dùng Interface riêng cho sạch

  // Sửa lại hàm này để nhận object thay vì chỉ nhận 1 string message
  addNotification: (data: {
    title: string;
    description: string;
    type?: INotification["type"];
  }) => void;

  clearUnread: () => void;
  removeNotification: (id: number) => void;

  fetchOrders: (page?: number, isSilent?: boolean) => Promise<void>;
  fetchOrderById: (orderId: number) => Promise<IAdminOrder | null>;
  updateOrderStatus: (
    orderId: number,
    newStatus: string,
    cancelReason?: string,
  ) => Promise<void>;
  filterOrders: (data: any, isSilent?: boolean) => Promise<void>;
}
