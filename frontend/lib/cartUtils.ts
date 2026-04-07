// frontend/lib/cartUtils.ts
import { ICartItem } from "@/app/types/client/cart";

export const calculateToppingsPrice = (toppings: ICartItem["toppings"]) => {
  return toppings.reduce((total, topping) => total + topping.price, 0);
};

export const calculateUnitPrice = (item: ICartItem) => {
  const basePrice =
    item.size && item.size.price > 0 ? item.size.price : item.product.price;
  const toppingsPrice = calculateToppingsPrice(item.toppings);
  return basePrice + toppingsPrice;
};

export const calculateSubtotal = (item: ICartItem) => {
  return calculateUnitPrice(item) * item.quantity;
};
