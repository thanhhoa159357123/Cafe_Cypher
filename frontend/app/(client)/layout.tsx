"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/items/Navbar";
import { useCartStore } from "../store/client/useCartStore";
import { useCategoryStore } from "../store/client/useCategoryStore";
import { useProductStore } from "../store/client/useProductStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { fetchCategories } = useCategoryStore();
  const { fetchCart } = useCartStore();
  const { fetchProducts } = useProductStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    // Gộp 3 API vào chạy cùng lúc
    Promise.all([fetchCategories(), fetchCart(), fetchProducts()]).catch(
      (err) => console.error(err),
    );
  }, []);

  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
}
