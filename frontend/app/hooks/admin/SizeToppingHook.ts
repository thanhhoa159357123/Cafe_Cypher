"use client";

import { useSizeStore } from "@/app/store/admin/useSizeStore";
import { useToppingStore } from "@/app/store/admin/useToppingStore";
import { useEffect } from "react";

export const SizeToppingHook = () => {
  const { sizes, fetchSizes } = useSizeStore();
  const { toppings, fetchToppings } = useToppingStore();

  useEffect(() => {
    fetchSizes();
    fetchToppings();
  }, []);

  return { sizes, fetchSizes, toppings, fetchToppings };
};
