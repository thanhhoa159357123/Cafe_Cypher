import axiosClient from "@/lib/axios";
import type {
  SizeFormData,
  SizeResponse,
  ISizeAdmin,
  ToppingFormData,
  ToppingResponse,
  IToppingAdmin,
} from "@/app/types/admin/size_topping";

// ==========================================
// Size Services
// ==========================================

/** Lấy danh sách tất cả các size */
export const getSizes = async (): Promise<ISizeAdmin[]> => {
  const res = await axiosClient.get("/admin/sizes");
  return res.data;
};

/** Thêm size mới */
export const createSize = async (data: SizeFormData): Promise<SizeResponse> => {
  const res = await axiosClient.post("/admin/sizes", data);
  return res.data;
};

/** Cập nhật size */
export const updateSize = async (
  id: number | string,
  data: SizeFormData,
): Promise<SizeResponse> => {
  const res = await axiosClient.put(`/admin/sizes/${id}`, data);
  return res.data;
};

/** Xóa mềm size */
export const deleteSize = async (id: number | string): Promise<SizeResponse> => {
  const res = await axiosClient.delete(`/admin/sizes/${id}`);
  return res.data;
};

/** Chuyển đổi trạng thái size (active <-> inactive) */
export const toggleSizeStatus = async (
  id: number | string,
): Promise<SizeResponse> => {
  const res = await axiosClient.put(`/admin/sizes/${id}/toggle-status`);
  return res.data;
};

/** Khôi phục size đã xóa mềm */
export const restoreSize = async (
  id: number | string,
): Promise<SizeResponse> => {
  const res = await axiosClient.put(`/admin/sizes/${id}/restore`);
  return res.data;
};

// ==========================================
// Topping Services
// ==========================================

/** Lấy danh sách tất cả các topping */
export const getToppings = async (): Promise<IToppingAdmin[]> => {
  const res = await axiosClient.get("/admin/toppings");
  return res.data;
};

/** Thêm topping mới */
export const createTopping = async (
  data: ToppingFormData,
): Promise<ToppingResponse> => {
  const res = await axiosClient.post("/admin/toppings", data);
  return res.data;
};

/** Cập nhật topping */
export const updateTopping = async (
  id: number | string,
  data: ToppingFormData,
): Promise<ToppingResponse> => {
  const res = await axiosClient.put(`/admin/toppings/${id}`, data);
  return res.data;
};

/** Xóa mềm topping */
export const deleteTopping = async (
  id: number | string,
): Promise<ToppingResponse> => {
  const res = await axiosClient.delete(`/admin/toppings/${id}`);
  return res.data;
};

/** Chuyển đổi trạng thái topping (active <-> inactive) */
export const toggleToppingStatus = async (
  id: number | string,
): Promise<ToppingResponse> => {
  const res = await axiosClient.put(`/admin/toppings/${id}/toggle-status`);
  return res.data;
};

/** Khôi phục topping đã xóa mềm */
export const restoreTopping = async (
  id: number | string,
): Promise<ToppingResponse> => {
  const res = await axiosClient.put(`/admin/toppings/${id}/restore`);
  return res.data;
};
