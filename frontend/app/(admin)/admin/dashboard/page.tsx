"use client";

import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  Coffee,
  UserRound,
} from "lucide-react";
import { DashboardHook } from "@/app/hooks/admin/DashboardHook";
import Link from "next/link";
import { cn } from "@/lib/utils";
import RevenueChart from "./RevenueChart";

// Cấu hình trạng thái đơn hàng với màu sắc theo theme
const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Chờ xác nhận",
      className: "bg-primary/10 text-primary border border-primary/20",
    },
    processing: {
      label: "Đang pha chế",
      className:
        "bg-secondary/20 text-secondary-foreground border border-secondary/30",
    },
    shipping: {
      label: "Đang giao",
      className: "bg-accent/20 text-accent-foreground border border-accent/30",
    },
    completed: {
      label: "Hoàn thành",
      className: "bg-emerald-100 text-emerald-700 border border-emerald-200", // Giữ lại vì theme chưa có success
    },
    cancelled: {
      label: "Đã hủy",
      className:
        "bg-destructive/10 text-destructive border border-destructive/20",
    },
  };
  return (
    configs[status] || {
      label: "Không xác định",
      className: "bg-muted text-muted-foreground border border-border",
    }
  );
};

const AdminDashboard = () => {
  const { dashboard, loading, error } = DashboardHook();

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-muted-foreground animate-pulse">
        Đang tải dữ liệu...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center font-bold text-destructive">
        Lỗi: {error}
      </div>
    );
  if (!dashboard) return null;

  const statsInfo = dashboard.stats;
  const recentOrders = dashboard.recent_orders || [];

  // Số liệu thống kê với icon và màu theme
  const stats = [
    {
      label: "Tổng doanh thu",
      value: `${Number(statsInfo.total_revenue).toLocaleString("vi-VN")}đ`,
      icon: <TrendingUp className="text-primary" size={20} />,
      change: "+12%",
      changeType: "increase",
    },
    {
      label: "Đơn hàng chờ xử lý",
      value: statsInfo.new_orders.toString(),
      icon: <Clock className="text-secondary-foreground" size={20} />,
      change: "Mới",
      changeType: "neutral",
    },
    {
      label: "Tổng Sản phẩm",
      value: statsInfo.total_products.toString(),
      icon: <Coffee className="text-accent-foreground" size={20} />,
      change: "Đang bán",
      changeType: "neutral",
    },
    {
      label: "Tổng Khách hàng",
      value: statsInfo.total_customers.toString(),
      icon: <UserRound className="text-muted-foreground" size={20} />,
      change: "Tổng số",
      changeType: "neutral",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-3xl font-black tracking-tight text-card-foreground">
          Bảng điều khiển
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          Chào mừng bác Hòa trở lại hệ thống quản lý Cypher Cafe.
        </p>
      </div>

      {/* 4 thẻ thống kê */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-default overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                {stat.icon}
              </div>
              {stat.change && (
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full",
                    stat.changeType === "increase"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-black mt-1 text-card-foreground">
              {stat.value}
            </p>
            {/* Hiệu ứng underline khi hover */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* Biểu đồ và đơn hàng gần đây */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Biểu đồ doanh thu */}
        <div className="lg:col-span-4 bg-card rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-bold text-card-foreground flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Biểu đồ doanh thu
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Thống kê 7 ngày gần nhất
            </p>
          </div>
          <div className="flex-1 min-h-70 p-4">
            <RevenueChart data={dashboard.chart_data} />
          </div>
        </div>

        {/* Đơn hàng mới */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="flex justify-between items-center p-6 pb-2">
            <div>
              <h2 className="text-lg font-bold text-card-foreground flex items-center gap-2">
                <ShoppingCart size={20} className="text-primary" />
                Đơn hàng mới
              </h2>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">
                Giao dịch mới nhất trên app
              </p>
            </div>
            <Link
              href="/admin/order"
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex-1 p-6 pt-2 overflow-y-auto max-h-80 space-y-3">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border">
                <ShoppingCart
                  className="mx-auto text-muted-foreground mb-2"
                  size={32}
                />
                <p className="text-muted-foreground text-sm font-medium italic">
                  Chưa có đơn hàng nào
                </p>
              </div>
            ) : (
              recentOrders.map((order: any) => {
                const statusConfig = getStatusConfig(order.status);
                return (
                  <div
                    key={order.id}
                    className="group flex justify-between items-center p-4 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-card-foreground group-hover:text-primary transition-colors cursor-pointer">
                          {order.order_number}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">
                          {order.user?.last_name || ""}{" "}
                          {order.user?.first_name || ""}
                          {!order.user?.last_name &&
                            !order.user?.first_name &&
                            "Khách vãng lai"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-primary text-sm tracking-tight">
                        {Number(order.total_price).toLocaleString("vi-VN")} đ
                      </p>
                      <span
                        className={cn(
                          "inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide",
                          statusConfig.className,
                        )}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
