import { create } from "zustand";
import { getProducts } from "../../services/admin/productService";
import { ProductState } from "@/app/types/admin/product";

export const useProductStore = create<ProductState>((set, get) => ({
  loading: false,
  error: null,
  products: [],
  meta: null,
  selectedProduct: null,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  fetchProducts: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await getProducts(page);
      set({ products: res.data, meta: res.meta || res, loading: false });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không lấy được dữ liệu";
      set({ error: errorMessage, loading: false });
    }
  },
}));
