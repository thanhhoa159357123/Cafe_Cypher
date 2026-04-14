import { ICategory } from "./category";

export interface ISize {
  id: number | string;
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
  status: "active" | "inactive";
  deleted_at?: string | null; // Thêm trường này để biết sản phẩm đã bị xóa mềm hay chưa
}
