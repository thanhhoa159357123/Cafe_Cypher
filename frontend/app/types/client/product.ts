import { ICategory } from "../base/category";
import { ISize, ITopping, IProduct } from "../base/product";

interface ProductState {
  loading: boolean;
  error: string | null;
  products: IProduct[];
  selectedProduct: IProduct | null;
  selectedSize: ISize | null;
  selectedToppings: ITopping[];

  fetchProducts: () => Promise<void>;
  setSelectedProduct: (product: IProduct | null) => void;
  setSelectedSize: (size: ISize | null) => void;
  setSelectedToppings: (topping: ITopping) => void;
  resetSelect: () => void;
}

export type { IProduct, ProductState, ISize, ITopping };
