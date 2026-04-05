import { create } from "zustand";
import { getCategories } from "../../services/client/categoryService";
import type { CategoryState, ICategory } from "@/app/types/category";

export const useCategoryStore = create<CategoryState>((set) => ({
  loading: false,
  error: null,
  categories: [],

  selectedCategory: null,

  setSelectedCategory: (category: ICategory | null) =>
    set({ selectedCategory: category }),

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getCategories();
      set({ categories: res.data, loading: false });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi tải danh mục.";
      set({ error: errorMessage, loading: false });
    }
  },
}));
