import { getToppings } from "@/app/services/admin/sizetoppingService";
import { ToppingState } from "@/app/types/admin/size_topping";
import { ITopping } from "@/app/types/base/product";
import { create } from "zustand";

export const useToppingStore = create<ToppingState>((set) => ({
  loading: false,
  error: null,
  toppings: [],

  selectedTopping: null,
  setSelectedTopping: (topping: ITopping | null) =>
    set({ selectedTopping: topping }),

  fetchToppings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getToppings();
      set({ toppings: res, loading: false });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi tải topping.";
      set({ error: errorMessage, loading: false });
    }
  },
}));
