import { create } from "zustand";
import { getProducts } from "../../services/client/productService";
import type { ProductState } from "@/app/types/client/product";
import { extractErrorMessage } from "@/lib/errorHandler";

export const useProductStore = create<ProductState>((set, get) => ({
  loading: false,
  error: null,
  products: [],
  selectedProduct: null,
  selectedSize: null,
  selectedToppings: [],

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getProducts();
      set({ products: res.data, loading: false });
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error, "Không lấy được dữ liệu");
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedToppings: (topping) => {
    const { selectedToppings } = get();

    const isExistTopping = selectedToppings.some((t) => t.id === topping.id);

    if (isExistTopping) {
      set({
        selectedToppings: selectedToppings.filter((t) => t.id !== topping.id),
      });
    } else {
      if (selectedToppings.length >= 3) {
        return;
      }
      set({
        selectedToppings: [...selectedToppings, topping],
      });
    }
  },

  resetSelect: () =>
    set({
      selectedProduct: null,
      selectedSize: null,
      selectedToppings: [],
    }),
}));
