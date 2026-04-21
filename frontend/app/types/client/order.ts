import { IOrder } from "../base/order";

// Dữ liệu tạm thời cho "Mua ngay" trước khi tạo đơn hàng, sẽ được lưu trong Zustand Store
export interface IBuyNowItemState {
  checkout_type: "buy_now";
  product_id: number;
  product_name: string;
  image_url: string | null;
  size_id?: number | null;
  size_name?: string | null;
  quantity: number;
  topping_ids?: number[] | string[];
  topping_names?: string[]; // Mảng tên topping hiển thị
  unit_price: number;
  total_price: number;
}

// ==========================================
// 3. PAYLOAD GỬI ĐI KHI ĐẶT HÀNG (TỐI ƯU HÓA)
// ==========================================

// 3.1 Dữ liệu cơ bản lúc nào cũng phải có
export interface IBaseOrderPayload {
  shipping_address: string;
  shipping_phone: string;
  note?: string;
  payment_method: "cash" | "qr_code" | (string & {}); // Cho phép mở rộng thêm phương thức thanh toán mới trong tương lai
}

// 3.2 Nhánh Mua qua giỏ hàng (Không cần truyền thông tin sản phẩm)
export interface ICartOrderPayload extends IBaseOrderPayload {
  checkout_type: "cart";
}

// 3.3 Nhánh Mua ngay lập tức (BẮT BUỘC phải truyền product_id và quantity)
export interface IBuyNowOrderPayload extends IBaseOrderPayload {
  checkout_type: "buy_now";
  product_id: number;
  image_url: string | null; // Thêm trường ảnh để hiển thị trong order history
  quantity: number;
  size_id?: number | null;
  topping_ids?: number[];
}

// 3.4 Gộp chung lại thành 1 Type an toàn tuyệt đối
export type ICreateOrderPayload = ICartOrderPayload | IBuyNowOrderPayload;

// ==========================================
// 4. KIỂU DỮ LIỆU CỦA ZUSTAND STORE
// ==========================================
export interface IOrderState {
  selectedOrder: IOrder | null;
  isOpen: boolean;
  openDrawer: (order: IOrder) => void;
  closeDrawer: () => void;

  // Real-time Notification State
  unreadCount: number;
  notifications: { id: number; message: string; time: Date }[];
  addNotification: (message: string) => void;
  clearUnread: () => void;

  loading: boolean;
  error: string | null;
  orders: IOrder[] | null; // Sửa thành mảng IOrder[] vì một User có danh sách nhiều đơn hàng
  buyNowItem: IBuyNowItemState | null;
  setBuyNowItem: (item: IBuyNowItemState | null) => void;
  fetchOrders: (isSilent?: boolean) => Promise<void>;
  createOrder: (data: ICreateOrderPayload) => Promise<unknown>; // Nhận đúng cái rule ở trên
  cancelOrder: (id: number, reason?: string) => Promise<unknown>; // Hủy đơn
}
