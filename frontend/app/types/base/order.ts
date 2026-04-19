export interface IOrderItem {
  id: number;
  product_id: number | null;
  name: string; // Quan trọng: lưu tên cứng lỡ SP có bị xoá
  image_url: string | null; // Thêm trường ảnh để hiển thị trong order history
  size: string | null;
  toppings: string[]; // Backend trả về mảng TÊN topping (string), không phải Object ITopping
  quantity: number;
  unit_price: number;
  total: number;
}

// 2. Giao diện cho 1 ĐƠN HÀNG hoàn chỉnh (Khớp với bảng orders)
export interface IOrder {
  id: number;
  order_number: string;
  total_price: number;
  status: string;
  created_at: string;

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

  cancel_reason?: string | null;
  cancelled_by?: number | null;

  items: IOrderItem[];
}
