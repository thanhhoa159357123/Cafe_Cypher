"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingCart,
  ShieldCheck,
  Package,
  CreditCard,
  Hash,
  ExternalLink,
} from "lucide-react";
import { IOrder } from "@/app/types/base/order";
import { useRouter } from "next/navigation";

// Helper: Map trạng thái đơn hàng → style
const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Chờ xác nhận",
    className: "bg-amber-100 text-amber-700",
  },
  processing: {
    label: "Đang xử lý",
    className: "bg-blue-100 text-blue-700",
  },
  shipping: {
    label: "Đang giao",
    className: "bg-indigo-100 text-indigo-700",
  },
  completed: {
    label: "Hoàn thành",
    className: "bg-emerald-100 text-emerald-700",
  },
  cancelled: {
    label: "Đã hủy",
    className: "bg-red-100 text-red-700",
  },
};

// Helper: Map phương thức thanh toán → label
const paymentMethodLabel: Record<string, string> = {
  cash: "Tiền mặt",
  momo: "MoMo",
  bank_transfer: "Chuyển khoản",
  credit_card: "Thẻ tín dụng",
};

interface UserFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null; // Để tạm any, cấu hình chuẩn thì thay bằng IAdminUser
}

export default function UserFormDrawer({
  isOpen,
  onClose,
  user,
}: UserFormDrawerProps) {
  const [localUser, setLocalUser] = useState<any | null>(user);
  const router = useRouter();

  const handleViewOrders = () => {
    if (user && user.id) {
      router.push(`/admin/order?user_id=${user.id}`);
    }
  };

  // Giữ data để tạo hiệu ứng đóng mượt mà
  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  const displayUser = user || localUser;
  if (!displayUser) return null;

  // Chỉ lấy 5 đơn gần nhất để preview
  const recentOrders: IOrder[] = displayUser.orders
    ? displayUser.orders.slice(0, 5)
    : [];

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-all cursor-pointer"
          onClick={onClose}
        />
      )}

      <SheetContent className="sm:max-w-xl z-50 overflow-y-auto w-full flex flex-col h-full bg-card border-l-border shadow-xl px-0">
        <SheetHeader className="mb-4 px-6 pt-6 pb-4 border-b border-border bg-slate-50/50">
          <SheetTitle className="text-2xl font-bold flex items-center gap-3 text-card-foreground">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div>
              <p className="flex items-center gap-2">
                {displayUser.last_name} {displayUser.first_name}
                {displayUser.role === "Admin" && (
                  <ShieldCheck size={18} className="text-purple-600" />
                )}
              </p>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 inline-block ${
                  displayUser.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {displayUser.status === "active" ? "Đang hoạt động" : "Tạm ẩn"}
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 px-6 overflow-y-auto pb-6">
          {/* KHUNG THÔNG TIN NGƯỜI DÙNG */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <User size={18} className="text-primary" /> Thông tin cá nhân
            </h3>
            <div className="bg-card border border-border p-4 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {displayUser.email || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-border/50"></div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Số điện thoại
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {displayUser.phone || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-border/50"></div>

              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Ngày tham gia
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {displayUser.created_at
                      ? new Date(displayUser.created_at).toLocaleDateString(
                          "vi-VN",
                        )
                      : "---"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KHUNG LỊCH SỬ ĐƠN HÀNG */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <ShoppingCart size={18} className="text-primary" /> Đơn hàng gần
                đây
              </h3>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                Tổng: {displayUser.orders_count || 0} đơn
              </span>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl overflow-hidden">
              {recentOrders.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {recentOrders.map((order: IOrder) => {
                    console.log("or", order);
                    const status = statusConfig[order.status] || {
                      label: order.status,
                      className: "bg-slate-100 text-slate-700",
                    };

                    return (
                      <div
                        key={order.id}
                        className="p-4 hover:bg-muted/40 transition-colors"
                      >
                        {/* Dòng 1: Mã đơn + Trạng thái */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Hash size={14} className="text-muted-foreground" />
                            <span className="text-sm font-bold text-foreground">
                              {order.order_number}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        {/* Dòng 2: Chi tiết nhanh */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {/* Phương thức thanh toán */}
                          <span className="flex items-center gap-1">
                            <CreditCard size={12} />
                            {paymentMethodLabel[order.payment.method] ||
                              order.payment.method ||
                              "---"}
                          </span>

                          {/* Ngày đặt */}
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(order.created_at).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        {/* Dòng 3: Tổng tiền */}
                        <div className="flex items-center justify-between mt-2.5">
                          <span className="text-xs text-muted-foreground">
                            Thanh toán:{" "}
                            <span
                              className={`font-bold ${
                                order.payment.status === "paid"
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {order.payment.status === "paid"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </span>
                          </span>
                          <span className="text-sm font-black text-primary">
                            {order.total_price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart
                    size={32}
                    className="text-muted-foreground/40 mx-auto mb-2"
                  />
                  <p className="text-sm text-muted-foreground italic">
                    Khách hàng chưa có đơn hàng nào.
                  </p>
                </div>
              )}
            </div>

            {/* Nút xem tất cả đơn hàng */}
            {displayUser.orders_count > 0 && (
              <button
                onClick={handleViewOrders}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-muted/50 transition-colors text-sm font-bold"
              >
                <ExternalLink size={16} />
                Xem tất cả đơn hàng ({displayUser.orders_count})
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
