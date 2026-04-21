"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Ban,
  CheckCircle,
} from "lucide-react";
import { IAdminOrder } from "@/app/types/admin/order";

interface OrderFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: IAdminOrder | null;
  onUpdateStatus: (
    orderId: number,
    status: string,
    cancelReason?: string,
  ) => Promise<void>;
  isActionLoading?: boolean;
}

export default function OrderFormDrawer({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  isActionLoading,
}: OrderFormDrawerProps) {
  const [cancelReason, setCancelReason] = useState("");

  // Lưu giữ dữ liệu cũ để có thể chạy mượt mà animation lúc đóng form
  const [localOrder, setLocalOrder] = useState<IAdminOrder | null>(order);

  useEffect(() => {
    if (order) {
      setLocalOrder(order);
    }
  }, [order]);

  const displayOrder = order || localOrder;

  // Render không có displayOrder thì return null
  if (!displayOrder) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === "cancelled") {
      const reason = window.prompt(
        "Vui lòng nhập lý do huỷ đơn khách hàng (bắt buộc):",
      );
      if (reason === null) return; // Nếu user bấm Cancel trên hộp thoại prompt
      if (!reason.trim()) {
        alert("Lý do không được để trống. Đơn hàng chưa bị hủy!");
        return;
      }
      await onUpdateStatus(displayOrder.id, newStatus, reason.trim());
      onClose();
      return;
    }

    await onUpdateStatus(displayOrder.id, newStatus, cancelReason);
    onClose();
  };

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
        <SheetHeader className="mb-4 px-6 pt-6">
          <SheetTitle className="text-2xl font-bold flex items-center gap-3 text-card-foreground">
            <ShoppingCart className="text-primary" size={24} />
            Đơn hàng #{displayOrder.order_number}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground mt-2">
            Ngày đặt:{" "}
            {new Date(displayOrder.created_at).toLocaleString("vi-VN")}
          </SheetDescription>
        </SheetHeader>

        {/* --- NỘI DUNG CHI TIẾT --- */}
        <div className="flex-1 space-y-6 px-6 overflow-y-auto pb-6">
          {/* Thông tin Khách hàng & Giao hàng */}
          <div className="bg-muted/30 p-4 rounded-xl border border-border gap-4 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 text-foreground">
              <MapPin size={18} className="text-primary" /> Thông tin giao hàng
            </h3>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  Khách hàng:
                </span>{" "}
                {displayOrder.user
                  ? `${displayOrder.user.last_name} ${displayOrder.user.first_name}`
                  : "Khách vãng lai"}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Điện thoại:
                </span>{" "}
                {displayOrder.shipping.phone}
              </p>
              <p>
                <span className="font-semibold text-foreground">Địa chỉ:</span>{" "}
                {displayOrder.shipping.address}
              </p>
              {displayOrder.shipping.note && (
                <p className="text-destructive bg-destructive/10 p-2 rounded-md">
                  <span className="font-semibold">Ghi chú:</span>{" "}
                  {displayOrder.shipping.note}
                </p>
              )}
            </div>
          </div>

          {/* Thông tin Thanh toán */}
          <div className="bg-muted/30 p-4 rounded-xl border border-border gap-4 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 text-foreground">
              <CreditCard size={18} className="text-primary" /> Thanh toán
            </h3>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  Phương thức:
                </span>{" "}
                {displayOrder.payment.method === "cash"
                  ? "Tiền mặt (COD)"
                  : "Chuyển khoản / Quẹt QR"}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Trạng thái:
                </span>{" "}
                {displayOrder.payment.status === "paid"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </p>
            </div>
          </div>

          {/* Danh sách Sản phẩm */}
          <div>
            <h3 className="font-bold text-foreground mb-3">
              Sản phẩm ({displayOrder.items.length})
            </h3>
            <div className="space-y-3">
              {displayOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-border rounded-xl bg-card"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.png"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-muted-foreground">
                      Size: {item.size || "Mặc định"} | SLL: {item.quantity}
                    </p>
                    {item.toppings?.length > 0 && (
                      <p className="text-muted-foreground text-xs mt-1">
                        Topping: {item.toppings.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right font-bold text-rose-500">
                    {Number(item.total).toLocaleString("vi-VN")} đ
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/20">
            <span className="font-bold text-foreground">Tổng cộng</span>
            <span className="text-xl font-black text-rose-500">
              {Number(displayOrder.total_price).toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>

        {/* --- FOOTER (HÀNH ĐỘNG) --- */}
        <SheetFooter className="px-6 py-4 border-t border-border bg-background grid grid-cols-2 gap-3 sm:flex sm:justify-end">
          {displayOrder.status === "pending" && (
            <button
              onClick={() => handleStatusChange("processing")}
              disabled={isActionLoading}
              className="col-span-2 sm:col-span-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              Nhận pha chế
            </button>
          )}
          {displayOrder.status === "processing" && (
            <button
              onClick={() => handleStatusChange("shipping")}
              disabled={isActionLoading}
              className="col-span-2 sm:col-span-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              Giao hàng
            </button>
          )}
          {displayOrder.status === "shipping" && (
            <button
              onClick={() => handleStatusChange("completed")}
              disabled={isActionLoading}
              className="col-span-2 sm:col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} /> Hoàn thành
            </button>
          )}
          {!["completed", "cancelled"].includes(displayOrder.status) && (
            <button
              onClick={() => handleStatusChange("cancelled")}
              disabled={isActionLoading}
              className="col-span-2 sm:col-span-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Ban size={18} /> Hủy Đơn
            </button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
