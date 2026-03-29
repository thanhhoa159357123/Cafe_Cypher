import axiosClient from "@/lib/axios";

// Lấy thông tin giỏ hàng của người dùng
export const getCart = async () => {
  const response = await axiosClient.get("/cart");
  return response.data;
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (data: {
  product_id: number | string;
  size_id: number | string | null;
  topping_ids: number | string[];
  quantity: number;
}) => {
  const response = await axiosClient.post("/cart", data);
  return response.data;
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (
  cartItemId: number | string,
  quantity: number,
) => {
  const response = await axiosClient.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = async (cartItemId: number | string) => {
  const response = await axiosClient.delete(`/cart/${cartItemId}`);
  return response.data;
};
