interface ICartItem {
  id: number | string;
  quantity: number;
  product: {
    id: number | string;
    name: string;
    price: number;
    image: string | null;
    description: string;
  } | null;
  size: {
    id: number | string;
    name: string;
    price: number;
  } | null;
  toppings: {
    id: number | string;
    name: string;
    price: number;
  }[];
}

interface ICart {
  id: number | string;
  total_price: number;
  status: string;
  items: ICartItem[] | [];
}

interface CartState {
  loading: boolean;
  error: string | null;
  cart: ICart | null;

  fetchCart: () => Promise<void>;
  addToCart: (data: {
    product_id: number | string;
    size_id: number | string | null;
    topping_ids: number | string[];
    quantity: number;
  }) => Promise<void>;
  updateCartItem: (
    cartItemId: number | string,
    quantity: number,
  ) => Promise<void>;
  removeCartItem: (cartItemId: number | string) => Promise<void>;
}

export type { ICart, ICartItem, CartState };
