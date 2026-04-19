import { ISize, ITopping } from "../base/product";

// ==========================================
// Size Types
// ==========================================

/** Dữ liệu gửi lên khi tạo hoặc cập nhật size */
export interface SizeFormData {
  name: string;
}

/** Size đầy đủ từ API (bao gồm status & soft delete) */
export interface ISizeAdmin extends ISize {
  status: "active" | "inactive";
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** API response khi thao tác thành công với size */
export interface SizeResponse {
  message: string;
  data?: ISizeAdmin;
}

/** State quản lý size trong Zustand store */
export interface SizeState {
  loading: boolean;
  error: string | null;
  sizes: ISizeAdmin[];

  selectedSize: ISizeAdmin | null;
  setSelectedSize: (size: ISizeAdmin | null) => void;

  fetchSizes: () => Promise<void>;
  createSize: (data: SizeFormData) => Promise<void>;
  updateSize: (id: number | string, data: SizeFormData) => Promise<void>;
  deleteSize: (id: number | string) => Promise<void>;
  toggleSizeStatus: (id: number | string) => Promise<void>;
  restoreSize: (id: number | string) => Promise<void>;
}

// ==========================================
// Topping Types
// ==========================================

/** Dữ liệu gửi lên khi tạo hoặc cập nhật topping */
export interface ToppingFormData {
  name: string;
  price: number;
}

/** Topping đầy đủ từ API (bao gồm status & soft delete) */
export interface IToppingAdmin extends ITopping {
  status: "active" | "inactive";
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** API response khi thao tác thành công với topping */
export interface ToppingResponse {
  message: string;
  data?: IToppingAdmin;
}

/** State quản lý topping trong Zustand store */
export interface ToppingState {
  loading: boolean;
  error: string | null;
  toppings: IToppingAdmin[];

  selectedTopping: IToppingAdmin | null;
  setSelectedTopping: (topping: IToppingAdmin | null) => void;

  fetchToppings: () => Promise<void>;
  createTopping: (data: ToppingFormData) => Promise<void>;
  updateTopping: (id: number | string, data: ToppingFormData) => Promise<void>;
  deleteTopping: (id: number | string) => Promise<void>;
  toggleToppingStatus: (id: number | string) => Promise<void>;
  restoreTopping: (id: number | string) => Promise<void>;
}
