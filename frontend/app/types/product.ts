import { ICategory } from "./category";

interface ISize {
  size_id: string | number;
  size_name: string;
  size_price: number;
}

interface ITopping {
  topping_id: string | number;
  topping_name: string;
  topping_price: number;
}

interface IProduct {
  id: number | string;
  name: string;
  image: string | null;
  description: string;
  price: number;
  category?: ICategory | null;
  sizes: ISize[];
  toppings: ITopping[];
}

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
