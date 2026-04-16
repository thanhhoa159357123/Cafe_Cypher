import { User } from "../base/auth";

export interface IAdminUser extends User {
  id: number; // ID người dùng
  orders_count: number; // Số lượng đơn hàng đã đặt
  status: "active" | "inactive"; // Trạng thái hoạt động của người dùng
  deleted_at: string | null; // Thời gian xóa (nếu có)
}

export interface IAdminUserState {
  users: IAdminUser[]; // Danh sách người dùng
  loading: boolean; // Trạng thái tải dữ liệu
  error: string | null; // Lỗi nếu có

  fetchUsers: (role?: string) => Promise<void>; // Hàm lấy danh sách người dùng, có thể lọc theo vai trò
  fetchUserById: (id: number) => Promise<IAdminUser | null>; // Hàm lấy chi tiết người dùng theo ID
}
