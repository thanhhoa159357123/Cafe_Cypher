// frontend/lib/cartUtils.ts
import { ICartItem } from "@/app/types/client/cart";

export const calculateToppingsPrice = (toppings: ICartItem["toppings"]) => {
  return toppings.reduce((total, topping) => total + topping.price, 0);
};

export const calculateUnitPrice = (item: ICartItem) => {
  const productPrice = item.product?.price || 0;
  const basePrice =
    item.size && item.size.price > 0 ? item.size.price : productPrice;
  console.log("basePrice", basePrice);
  const toppingsPrice = calculateToppingsPrice(item.toppings);
  return basePrice + toppingsPrice;
};

export const calculateSubtotal = (item: ICartItem) => {
  return calculateUnitPrice(item) * item.quantity;
};
