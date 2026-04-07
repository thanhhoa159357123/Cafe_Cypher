import { create } from "zustand";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/admin/categoryService";
import type { CategoryState } from "@/app/types/admin/category";
import type { ICategory } from "@/app/types/base/category";
import { toast } from "sonner";

export const useCategoryStore = create<CategoryState>((set, get) => ({
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

  createCategory: async (data) => {
    set({ loading: true, error: null });
    try {
      const name = data.name || ""; // Đảm bảo name luôn là string, tránh lỗi khi gửi null hoặc undefined

      if (!name) throw new Error("Tên danh mục không được để trống.");

      const res = await createCategory({
        name,
        parent_id: data.parent_id,
      });
      // Optionally, update the categories list with the newly created category
      set((state) => ({
        categories: [...state.categories, res],
        loading: false,
      }));
      get().fetchCategories(); // Tải lại danh sách sau khi tạo mới
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi tạo danh mục.";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage); // Ném lỗi để component có thể xử lý
    }
  },

  updateCategory: async (id, data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên danh mục không được để trống.");

      const res = await updateCategory(id, data);

      // Opt: Cập nhật lại trong mảng ko cần gọi lại API getCategories
      set((state) => ({
        loading: false,
      }));
      get().fetchCategories(); // Tải lại danh sách sau khi cập nhật
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi cập nhật danh mục.";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteCategory: async (id) => {
    // Tương tự, bạn có thể implement deleteCategory nếu cần
    set({ loading: true, error: null });
    try {
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        loading: false,
      }));
      get().fetchCategories(); // Tải lại danh sách sau khi xóa
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Đã có lỗi xảy ra khi xóa danh mục.";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
