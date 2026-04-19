import { filterProduct } from "./../../services/admin/productService";
import { ICategory } from "../base/category";
import { ISize, ITopping, IProduct } from "../base/product";

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface IAdminFormDataProduct {
  name: string;
  price: number;
  description?: string;
  category_id: number | string; // Có thể là null nếu không chọn category nào
  image?: File | string; // Có thể là File (khi upload mới) hoặc string (URL cũ) hoặc null (không có ảnh)
  sizes: ISize[]; // Luôn là mảng, có thể rỗng nếu không chọn size nào
  toppings: ITopping[]; // Luôn là mảng, có thể rỗng nếu không chọn topping nào
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: IProduct[];
  meta: PaginationMeta | null;
  selectedProduct: IProduct | null;

  setSelectedProduct: (product: IProduct | null) => void;
  fetchProducts: (page?: number) => Promise<void>;
  createProduct: (data: IAdminFormDataProduct) => Promise<void>;
  updateProduct: (
    id: number | string,
    data: IAdminFormDataProduct,
  ) => Promise<void>;
  deleteProduct: (id: number | string) => Promise<void>;
  toggleProductStatus: (id: number | string) => Promise<void>;
  restoreProduct: (id: number | string) => Promise<void>;
  filterProduct: (data: any) => Promise<void>;
}
