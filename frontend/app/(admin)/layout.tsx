// app/(admin)/layout.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar"; // Chỉnh lại đường dẫn import cho đúng thư mục của bác
import Navbar from "./components/Navbar";
import { useCategoryStore } from "../store/client/useCategoryStore";
import { useCartStore } from "../store/client/useCartStore";
import { useProductStore } from "../store/client/useProductStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchCategories } = useCategoryStore();
  const { fetchProducts } = useProductStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    // Gộp 3 API vào chạy cùng lúc
    Promise.all([fetchCategories(), fetchProducts()]).catch((err) =>
      console.error(err),
    );
  }, []);
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Gọi Component Sidebar ra */}
      <Sidebar />

      {/* Nội dung chính bên phải */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Thanh Header ngang ở trên */}
        <Navbar />

        {/* Khu vực đổ dữ liệu của các trang (Dashboard, Orders,...) */}
        <div className="p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
