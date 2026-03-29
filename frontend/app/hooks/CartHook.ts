import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { toast } from "sonner";
import { ICartItem } from "../types/cart";

export const CartHook = () => {
  const { cart, addToCart, updateCartItem, removeCartItem } = useCartStore();

  const handleAddToCart = async (data: {
    product_id: number | string;
    size_id: number | string | null;
    topping_ids: number | string[];
    quantity: number;
  }) => {
    await addToCart(data);
  };

  return {
    cart,
    handleAddToCart,
    updateCartItem,
    removeCartItem,
  };
};
