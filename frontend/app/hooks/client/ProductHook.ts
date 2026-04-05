"use client";

import { useEffect } from "react";
import { useProductStore } from "../../store/client/useProductStore";

export const ProductHook = () => {
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    selectedToppings,
    setSelectedToppings,
    resetSelect,
  } = useProductStore();

  return {
    products,
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    selectedToppings,
    setSelectedToppings,
    resetSelect,
  };
};
