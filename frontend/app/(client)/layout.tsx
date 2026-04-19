"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/items/Navbar";
import { useCartStore } from "../store/client/useCartStore";
import { useCategoryStore } from "../store/client/useCategoryStore";
import { useProductStore } from "../store/client/useProductStore";
import { useAuthStore } from "../store/client/useAuthStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { fetchCategories } = useCategoryStore();
  const { fetchCart } = useCartStore();
  const { fetchProducts } = useProductStore();
  const { isAuthenticated } = useAuthStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    // Gộp 2 API không cần Auth vào chạy cùng lúc
    Promise.all([fetchCategories(), fetchProducts()]).catch(
      (err) => console.error(err),
    );
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart().catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
}
