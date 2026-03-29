import { ICategory } from "./category";

interface ISize {
  id: string | number;
  name: string;
  price: number;
}

interface ITopping {
 id: string | number;
 name: string;
 price: number;
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
