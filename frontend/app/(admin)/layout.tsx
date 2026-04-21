// app/(admin)/layout.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar"; // Chỉnh lại đường dẫn import cho đúng thư mục của bác
import Navbar from "./components/Navbar";
import { useCategoryStore } from "../store/admin/useCategoryStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchCategories } = useCategoryStore();
  const pathname = usePathname();

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    // Gộp API vào chạy cùng lúc
    Promise.all([fetchCategories()]).catch((err) => console.error(err));
  }, [fetchCategories]);

  // Nếu là trang đăng nhập admin, không hiển thị Sidebar và Navbar
  if (pathname === "/admin/management-login") {
    return <main className="min-h-screen">{children}</main>;
  }

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
