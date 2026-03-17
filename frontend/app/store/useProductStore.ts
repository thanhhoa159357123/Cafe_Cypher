import { create } from "zustand";
import { getProducts } from "../services/productService";
import type { ProductState } from "@/app/types/product";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: "Không lấy được dữ liệu", loading: false });
    }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedToppings: (topping) => {
    const { selectedToppings } = get();

    const isExistTopping = selectedToppings.some(
      (t) => t.topping_id === topping.topping_id,
    );

    if (isExistTopping) {
      set({
        selectedToppings: selectedToppings.filter(
          (t) => t.topping_id !== topping.topping_id,
        ),
      });
    } else {
      if (selectedToppings.length >= 3) {
        console.warn("Chỉ được chọn tối đa 3 topping!!!");
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
