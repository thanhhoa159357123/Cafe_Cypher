import { IProduct, ISize } from "./product";

// 1. Giao diện cho TỪNG MÓN trong 1 Đơn hàng (Khớp với bảng order_items)
export interface IOrderItem {
  id: number;
  product_id: number | null;
  name: string; // Quan trọng: lưu tên cứng lỡ SP có bị xoá
  image: string | null; // Thêm trường ảnh để hiển thị trong order history
  size: string | null;
  toppings: string[]; // Backend trả về mảng TÊN topping (string), không phải Object ITopping
  quantity: number;
  unit_price: number;
  total: number;
}

// 2. Giao diện cho 1 ĐƠN HÀNG hoàn chỉnh (Khớp với bảng orders)
export interface IOrder {
  id: number;
  order_code: string;
  total_price: number;
  status: string;
  created_at: string;

  // Khớp với Object lồng trong Log
  payment: {
    method: string;
    status: string;
    paid_at: string | null;
  };

  shipping: {
    address: string;
    phone: string;
    note: string | null;
  };

  items: IOrderItem[];
}

// Dữ liệu tạm thời cho "Mua ngay" trước khi tạo đơn hàng, sẽ được lưu trong Zustand Store
export interface IBuyNowItemState {
  checkout_type: "buy_now";
  product_id: number;
  product_name: string;
  image_url: string | null;
  size_id?: number | null;
  size_name?: string | null;
  quantity: number;
  topping_ids?: number[] | string[]; // Có thể là số hoặc chuỗi tuỳ vào cách lưu trữ ID của bạn
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

  loading: boolean;
  error: string | null;
  orders: IOrder[] | null; // Sửa thành mảng IOrder[] vì một User có danh sách nhiều đơn hàng
  buyNowItem: IBuyNowItemState | null;
  setBuyNowItem: (item: IBuyNowItemState | null) => void;
  fetchOrders: () => Promise<void>;
  createOrder: (data: ICreateOrderPayload) => Promise<any>; // Nhận đúng cái rule ở trên
}
