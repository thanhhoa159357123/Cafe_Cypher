import { ISize, ITopping } from "../base/product";

export interface SizeState {
  loading: boolean;
  error: string | null;
  sizes: ISize[] | [];

  selectedSize: ISize | null;
  setSelectedSize: (size: ISize | null) => void;

  fetchSizes: () => Promise<void>;
}

export interface ToppingState {
  loading: boolean;
  error: string | null;
  toppings: ITopping[] | [];

  selectedTopping: ITopping | null;
  setSelectedTopping: (topping: ITopping | null) => void;

  fetchToppings: () => Promise<void>;
}
