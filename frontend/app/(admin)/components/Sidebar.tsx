// app/(admin)/components/Sidebar.tsx (Tùy vị trí bác đặt)
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Coffee,
  Tags,
  PlusSquare,
  Users,
  LogOut,
} from "lucide-react";
import { useAdminAuthStore } from "@/app/store/admin/useAdminAuthStore";
import { toast } from "sonner";

const Sidebar = () => {
  const router = useRouter();
  const { logout } = useAdminAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất khỏi phiên quản trị.");
      const secretKey =
        process.env.NEXT_PUBLIC_ADMIN_SECRET || "cafe_cypher_2026";
      router.push(`/admin/management-login?key=${secretKey}`);
    } catch (error) {
      toast.error("Lỗi đăng xuất.");
    }
  };

  // Danh sách menu chuẩn theo Database của bác
  const menuItems = [
    {
      label: "Tổng quan",
      href: "/admin/dashboard", // Hoặc giữ /admin-dashboard đều được
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Đơn hàng",
      href: "/admin/order", // Bắt buộc có /admin/...
      icon: <ShoppingCart size={20} />,
    },
    {
      label: "Sản phẩm",
      href: "/admin/product",
      icon: <Coffee size={20} />,
    },
    {
      label: "Danh mục",
      href: "/admin/category",
      icon: <Tags size={20} />,
    },
    {
      label: "Topping & Size",
      href: "/admin/topping_size",
      icon: <PlusSquare size={20} />,
    },
    {
      label: "Khách hàng",
      href: "/admin/customers",
      icon: <Users size={20} />,
    },
    {
      label: "Nhân viên",
      href: "/admin/employees",
      icon: <Users size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col fixed h-full z-20 shadow-sm">
      {/* TOP: LOGO */}
      <div className="p-6 mb-2">
        <h2 className="text-2xl font-black text-primary tracking-tighter">
          CYPHER <span className="text-foreground">ADMIN</span>
        </h2>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
          Quản lý hệ thống
        </p>
      </div>

      {/* CONTENT: MENU ITEMS */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors cursor-pointer font-medium"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* BOTTOM: USER/LOGOUT */}
      <div className="p-4 border-t border-border mt-auto">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
        >
          <LogOut size={20} className="text-red-500" />
          Đăng xuất
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
