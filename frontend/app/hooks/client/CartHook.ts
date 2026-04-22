import { toast } from "sonner";
import { useCartStore } from "../../store/client/useCartStore";

export const CartHook = () => {
  const { cart, addToCart, updateCartItem, removeCartItem } = useCartStore();

  const handleAddToCart = async (data: {
    product_id: number | string;
    size_id: number | string | null;
    topping_ids: number | string[];
    quantity: number;
  }) => {
    try {
      await addToCart(data);
    } catch (error) {
      toast.error("Thêm thất bại! Vui lòng thử lại.");
    }
  };

  return {
    cart,
    handleAddToCart,
    updateCartItem,
    removeCartItem,
  };
};
