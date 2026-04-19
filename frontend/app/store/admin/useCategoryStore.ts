import { create } from "zustand";
import {
  createCategory,
  deleteCategory,
  getCategories,
  restoreCategory,
  toggleCategoryStatus,
  updateCategory,
} from "../../services/admin/categoryService";
import type { CategoryState } from "@/app/types/admin/category";
import type { ICategory } from "@/app/types/base/category";
import { extractErrorMessage } from "@/lib/errorHandler";

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
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tải danh mục.",
      );
      set({ error: errorMessage, loading: false });
    }
  },

  createCategory: async (data) => {
    set({ loading: true, error: null });
    try {
      const name = data.name || ""; // Đảm bảo name luôn là string, tránh lỗi khi gửi null hoặc undefined

      if (!name) throw new Error("Tên danh mục không được để trống.");

      await createCategory({
        name,
        parent_id: data.parent_id,
      });
      await get().fetchCategories(); // Tải lại danh sách sau khi tạo mới
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tạo danh mục.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage); // Ném lỗi để component có thể xử lý
    }
  },

  updateCategory: async (id, data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên danh mục không được để trống.");

      await updateCategory(id, data);
      await get().fetchCategories(); // Tải lại danh sách sau khi cập nhật
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi cập nhật danh mục.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteCategory: async (id) => {
    // Tương tự, bạn có thể implement deleteCategory nếu cần
    set({ loading: true, error: null });
    try {
      await deleteCategory(id);
      await get().fetchCategories(); // Tải lại danh sách sau khi xóa để lấy dữ liệu mới kèm thuộc tính deleted_at
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi xóa danh mục.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  toggleCategoryStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      await toggleCategoryStatus(id);
      await get().fetchCategories();
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        "Không thay đổi được trạng thái danh mục",
      );
      set({ error: errorMessage, loading: false });
    }
  },

  restoreCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await restoreCategory(id);
      await get().fetchCategories();
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        "Không khôi phục được sản phẩm",
      );
      set({ error: errorMessage, loading: false });
    }
  },
}));
