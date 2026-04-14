import { create } from "zustand";
import {
  createProduct,
  deleteProduct,
  getProducts,
  restoreProduct,
  toggleProductStatus,
  updateProduct,
} from "../../services/admin/productService";
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

  createProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      // Gọi API tạo sản phẩm mới (cần implement createProduct trong productService)
      await createProduct(data);
      console.log("Dữ liệu nhận được ở store", data);
      // Sau khi tạo thành công, có thể gọi lại fetchProducts để cập nhật danh sách
      await get().fetchProducts();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không tạo được sản phẩm";
      set({ error: errorMessage, loading: false });
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateProduct(id, data);
      await get().fetchProducts();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không cập nhật được sản phẩm";
      set({ error: errorMessage, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      await get().fetchProducts();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không xóa được sản phẩm";
      set({ error: errorMessage, loading: false });
    }
  },

  toggleProductStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      await toggleProductStatus(id);
      await get().fetchProducts();
    } catch (error) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không thay đổi được trạng thái sản phẩm";
      set({ error: errorMessage, loading: false });
    }
  },

  restoreProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await restoreProduct(id);
      await get().fetchProducts();
    } catch (error) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Không khôi phục được sản phẩm";
      set({ error: errorMessage, loading: false });
    }
  },
}));
