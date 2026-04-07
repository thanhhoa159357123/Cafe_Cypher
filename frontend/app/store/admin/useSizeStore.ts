import { getSizes } from "@/app/services/admin/sizetoppingService";
import { SizeState } from "@/app/types/admin/size_topping";
import { ISize } from "@/app/types/base/product";
import { create } from "zustand";

export const useSizeStore = create<SizeState>((set) => ({
  loading: false,
  error: null,
  sizes: [],

  selectedSize: null,
  setSelectedSize: (size: ISize | null) => set({ selectedSize: size }),

  fetchSizes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getSizes();
      set({ sizes: res, loading: false });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi tải kích thước.";
      set({ error: errorMessage, loading: false });
    }
  },
}));
