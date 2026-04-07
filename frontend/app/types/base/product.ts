import { ICategory } from "./category";

export interface ISize {
  id: string | number;
  name: string;
  price: number;
}

export interface ITopping {
  id: string | number;
  name: string;
  price: number;
}

export interface IProduct {
  id: number | string;
  name: string;
  image: string | null;
  description: string;
  price: number;
  category?: ICategory | null;
  sizes: ISize[];
  toppings: ITopping[];
}
