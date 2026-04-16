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
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { IOrder } from "@/app/types/base/order";
import { useRouter } from "next/navigation";

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

  console.log("us", user);
  // Giữ data để tạo hiệu ứng đóng mượt mà
  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  const displayUser = user || localUser;
  if (!displayUser) return null;
  console.log("dis", displayUser);
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
                <ShoppingCart size={18} className="text-primary" /> Lịch sử đơn
                hàng
              </h3>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">
                Tổng: {displayUser.orders_count || 0} đơn
              </span>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl p-4">
              {displayUser.orders_count > 0 ? (
                <div className="text-center py-6 space-y-2">
                  {displayUser.orders.map((order: IOrder) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 border border-border rounded-lg p-3"
                    >
                      <div className="shrink-0">
                        <ShoppingCart size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Đơn hàng #{order.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground italic">
                    Khách hàng chưa có đơn hàng nào.
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleViewOrders}
            className="px-3 py-2 bg-primary rounded-md cursor-pointer"
          >
            Xem danh sách đơn hàng
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
