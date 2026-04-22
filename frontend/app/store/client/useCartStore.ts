import { create } from "zustand";
import { CartState, ICartItem } from "../../types/client/cart";
// Đổi tên các hàm import từ service để tránh bị trùng tên với action của store
import {
  addToCart as apiAddToCart,
  getCart as apiGetCart,
  removeCartItem as apiRemoveCartItem,
  updateCartItem as apiUpdateCartItem,
} from "../../services/client/cartService";
import { toast } from "sonner";

export const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  error: null,
  cart: null,

  fetchCart: async (silent = false) => {
    if (!silent) set({ loading: true, error: null });
    try {
      const response = await apiGetCart();
      // Đảm bảo thứ tự hiển thị không bị nhảy khi gọi lại api
      if (response.data && response.data.items) {
        response.data.items.sort(
          (a: ICartItem, b: ICartItem) => Number(a.id) - Number(b.id),
        );
      }
      set({ loading: false, cart: response.data });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch cart" });
    }
  },

  addToCart: async (data: {
    product_id: number | string;
    size_id: number | string | null;
    topping_ids: number | string[];
    quantity: number;
  }) => {
    set({ loading: true, error: null });

    // Bắt đầu toast loading
    const toastId = toast.loading("Đang thêm vào giỏ hàng...");

    try {
      await apiAddToCart(data);
      await get().fetchCart();
      // 3. CẬP NHẬT TOAST THÀNH SUCCESS (Nó sẽ tự mất sau vài giây)
      toast.success("Đã thêm vào giỏ hàng thành công!", { id: toastId });

      set({ loading: false }); // Tắt loading trong store
    } catch (error) {
      toast.dismiss(toastId); // Xoá toast loading nếu có lỗi
      set({ loading: false, error: "Failed to add item to cart" });
      throw error; // Ném lỗi để CartHook bắt và hiển thị Toast
    }
  },

  updateCartItem: async (cartItemId: number | string, quantity: number) => {
    const { cart } = get();

    // 1. OPTIMISTIC UPDATE: Cập nhật giao diện mượt mà NGAY TỨC THÌ
    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item,
      );
      set({ cart: { ...cart, items: updatedItems as typeof cart.items } });
    }

    // 2. GỌI API NGẦM TRONG BACKGROUND
    try {
      await apiUpdateCartItem(cartItemId, quantity);

      // Load lại ngầm một lần nữa để lấy chuẩn total_price từ Backend (nếu cần)
      get().fetchCart();
    } catch (error) {
      // Nếu API lỗi, tải lại dữ liệu ban đầu từ Backend để khôi phục
      get().fetchCart();
      set({ error: "Failed to update cart item" });

      // Chỉ khi gặp LỖI MẠNG / Bị Reject thì báo Toast, nếu không thì âm thầm
      toast.error("Không thể cập nhật số lượng!");
    }
  },

  removeCartItem: async (cartItemId: number | string) => {
    const { cart } = get();

    // 1. TỨC THÌ LỌC BỎ KHỎI MẶT TIỀN (UI) -> AnimatePresence sẽ bắt sự kiện này xoá mượt
    if (cart) {
      const filteredItems = cart.items.filter((item) => item.id !== cartItemId);
      // set() ngay lập tức, không có bất kỳ await nào chặn phía trước
      set({ cart: { ...cart, items: filteredItems as typeof cart.items } });
    }

    // Đã xoá ở UI rồi nên chỉ báo Toast thành công ngắn gọn cho người dùng biết
    const toastId = toast.success(`Đã xoá khỏi giỏ hàng!`);

    // 2. Đẩy Request âm thầm xuống Backend
    try {
      await apiRemoveCartItem(cartItemId);
      // Chạy ngầm, KHÔNG SET LOADING lên true để UI không bị flicker (chớp tắt)
      get().fetchCart();
    } catch (error) {
      // Nếu có lỗi mạng, tải lại từ API để khôi phục
      get().fetchCart();
      set({ error: "Failed to remove cart item" });

      // Đè lên thông báo xoá thành công lúc nãy nếu chẳng may API rớt mạng
      toast.error("Xoá thất bại! Vui lòng thử lại.", { id: toastId });
    }
  },
}));
