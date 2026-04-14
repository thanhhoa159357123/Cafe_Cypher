import { ICategory } from "../base/category";
import { ISize, ITopping, IProduct } from "../base/product";

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: IProduct[];
  meta: PaginationMeta | null;
  selectedProduct: IProduct | null;

  setSelectedProduct: (product: IProduct | null) => void;
  fetchProducts: (page?: number) => Promise<void>;
  createProduct: (data: IProduct) => Promise<void>;
  updateProduct: (id: number | string, data: IProduct) => Promise<void>;
  deleteProduct: (id: number | string) => Promise<void>;
  toggleProductStatus: (id: number | string) => Promise<void>;
  restoreProduct: (id: number | string) => Promise<void>;
}
