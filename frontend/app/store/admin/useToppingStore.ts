import { create } from "zustand";
import {
  getToppings,
  createTopping,
  updateTopping,
  deleteTopping,
  toggleToppingStatus,
  restoreTopping,
} from "@/app/services/admin/sizetoppingService";
import type { ToppingState } from "@/app/types/admin/size_topping";
import type { IToppingAdmin } from "@/app/types/admin/size_topping";
import { extractErrorMessage } from "@/lib/errorHandler";


export const useToppingStore = create<ToppingState>((set, get) => ({
  loading: false,
  error: null,
  toppings: [],

  selectedTopping: null,
  setSelectedTopping: (topping: IToppingAdmin | null) =>
    set({ selectedTopping: topping }),

  fetchToppings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getToppings();
      set({ toppings: res, loading: false });
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tải topping.",
      );
      set({ error: errorMessage, loading: false });
    }
  },

  createTopping: async (data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên topping không được để trống.");
      if (data.price < 0) throw new Error("Giá topping không được âm.");

      await createTopping(data);
      await get().fetchToppings();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tạo topping.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateTopping: async (id, data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên topping không được để trống.");
      if (data.price < 0) throw new Error("Giá topping không được âm.");

      await updateTopping(id, data);
      await get().fetchToppings();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi cập nhật topping.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteTopping: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTopping(id);
      await get().fetchToppings();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi xóa topping.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  toggleToppingStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      await toggleToppingStatus(id);
      await get().fetchToppings();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Không thay đổi được trạng thái topping.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  restoreTopping: async (id) => {
    set({ loading: true, error: null });
    try {
      await restoreTopping(id);
      await get().fetchToppings();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Không khôi phục được topping.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
