// app/(admin)/dashboard/page.tsx
import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const AdminDashboard = () => {
  // Sau này bác sẽ fetch data từ Laravel ở đây
  const stats = [
    {
      label: "Tổng doanh thu",
      value: "45,000,000đ",
      icon: <LayoutDashboard className="text-blue-600" />,
      change: "+12%",
    },
    {
      label: "Đơn hàng mới",
      value: "128",
      icon: <ShoppingCart className="text-orange-600" />,
      change: "+5%",
    },
    {
      label: "Sản phẩm",
      value: "45",
      icon: <Package className="text-purple-600" />,
      change: "0%",
    },
    {
      label: "Khách hàng",
      value: "1,024",
      icon: <Users className="text-green-600" />,
      change: "+18%",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Bảng điều khiển</h1>
        <p className="text-muted-foreground">
          Chào mừng bác Hòa trở lại hệ thống quản lý Cypher Cafe.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-muted rounded-lg">{stat.icon}</div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder cho Biểu đồ */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 p-6 bg-card rounded-2xl border border-border h-[400px] flex items-center justify-center text-muted-foreground italic">
          [Biểu đồ doanh thu 7 ngày qua]
        </div>
        <div className="lg:col-span-3 p-6 bg-card rounded-2xl border border-border h-[400px] flex items-center justify-center text-muted-foreground italic">
          [Đơn hàng mới nhất]
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
