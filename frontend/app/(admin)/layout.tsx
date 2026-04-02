// app/(admin)/layout.tsx
import React from "react";
import Sidebar from "./components/Sidebar"; // Chỉnh lại đường dẫn import cho đúng thư mục của bác
import Navbar from "./components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
