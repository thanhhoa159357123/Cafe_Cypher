"use client";

import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

export const ProductHook = () => {
  const {
    products,
    fetchProducts,
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    selectedToppings,
    setSelectedToppings,
    resetSelect,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
