import { create } from "zustand";
import {
  getSizes,
  createSize,
  updateSize,
  deleteSize,
  toggleSizeStatus,
  restoreSize,
} from "@/app/services/admin/sizetoppingService";
import type { SizeState } from "@/app/types/admin/size_topping";
import type { ISizeAdmin } from "@/app/types/admin/size_topping";
import { extractErrorMessage } from "@/lib/errorHandler";


export const useSizeStore = create<SizeState>((set, get) => ({
  loading: false,
  error: null,
  sizes: [],

  selectedSize: null,
  setSelectedSize: (size: ISizeAdmin | null) => set({ selectedSize: size }),

  fetchSizes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getSizes();
      set({ sizes: res, loading: false });
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tải kích thước.",
      );
      set({ error: errorMessage, loading: false });
    }
  },

  createSize: async (data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên size không được để trống.");

      await createSize(data);
      await get().fetchSizes();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi tạo size.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateSize: async (id, data) => {
    set({ loading: true, error: null });
    try {
      if (!data.name) throw new Error("Tên size không được để trống.");

      await updateSize(id, data);
      await get().fetchSizes();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi cập nhật size.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteSize: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteSize(id);
      await get().fetchSizes();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Đã có lỗi xảy ra khi xóa size.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  toggleSizeStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      await toggleSizeStatus(id);
      await get().fetchSizes();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Không thay đổi được trạng thái size.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  restoreSize: async (id) => {
    set({ loading: true, error: null });
    try {
      await restoreSize(id);
      await get().fetchSizes();
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(
        error,
        "Không khôi phục được size.",
      );
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
