import { IProduct, ISize, ITopping } from "./product";

interface IOrder {
  id: number | string;
  checkout_type: string;
  shipping_address: string;
  shipping_phone: string;
  note: string | null;
  payment_method: string;
  product_id: IProduct;
  size_id: ISize | null;
  topping_ids: ITopping[] | [];
  quantity: number;
}
