"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, Eye, FileDown, CheckCircle } from "lucide-react";
import { OrderHook } from "@/app/hooks/admin/OrderHook";
import OrderFormDrawer from "../../components/FormDrawer/Order/OrderFormDrawer";
import Image from "next/image";

// Hàm hỗ trợ dịch trạng thái tiếng Anh sang tiếng Việt và màu sắc Bootstrap
const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Chờ xác nhận",
      className: "bg-amber-100 text-amber-700",
    },
    processing: {
      label: "Đang pha chế",
      className: "bg-blue-100 text-blue-700",
    },
    shipping: {
      label: "Đang giao hàng",
      className: "bg-purple-100 text-purple-700",
    },
    completed: {
      label: "Hoàn thành",
      className: "bg-emerald-100 text-emerald-700",
    },
    cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-700" },
  };
  return (
    configs[status] || {
      label: "Không xác định",
      className: "bg-gray-100 text-gray-700",
    }
  );
};

const OrderPage = () => {
  const {
    orders,
    selectedOrder,
    isFetchingOrders,
    isActionLoading,
    handleViewOrderDetails,
    handleCloseDetails,
    updateOrderStatus,
  } = OrderHook();

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-6 rounded-2xl border border-border shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ShoppingCart size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-card-foreground">
              Quản lý Đơn hàng
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Khách hàng đặt Online.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-5 py-2.5 rounded-xl hover:bg-muted transition-all text-sm font-bold shadow-sm">
            <FileDown size={18} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* CONTENT: Bảng */}
      <div
        className={`bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-opacity duration-300 ${isFetchingOrders ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <Table>
          <TableCaption className="mb-4">
            Danh sách đơn hàng phát sinh trên hệ thống.
          </TableCaption>
          <TableHeader className="bg-muted/50 border-b border-border">
            <TableRow>
              <TableHead className="w-40 font-bold text-card-foreground">
                Mã Đơn
              </TableHead>
              <TableHead className="font-bold text-card-foreground min-w-50">
                Khách hàng
              </TableHead>
              <TableHead className="font-bold text-card-foreground min-w-64">
                Sản phẩm
              </TableHead>
              <TableHead className="font-bold text-card-foreground w-40">
                Thời gian
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-right w-36">
                Tổng tiền
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-center w-36">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-card-foreground w-28">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  Chưa có đơn hàng nào
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                // Hiển thị tối đa 2 món, còn lại ghi "+ thêm..."
                const visibleItems = order.items.slice(0, 2);
                const hiddenCount = order.items.length - 2;

                return (
                  <TableRow
                    key={order.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-bold text-card-foreground text-xs uppercase tracking-wider">
                      {order.order_number}
                    </TableCell>

                    <TableCell>
                      <div className="font-bold text-primary">
                        {order.user?.last_name} {order.user?.first_name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-37.5">
                        {order.user?.email || "Khách vãng lai"}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="flex gap-2">
                        {visibleItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                              <Image
                                src={item.image_url || "/placeholder.png"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        ))}
                        {hiddenCount > 0 && (
                          <div className="text-xs text-muted-foreground italic font-medium ml-13">
                            + {hiddenCount} sản phẩm khác...
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-sm text-foreground font-medium">
                      {new Date(order.created_at).toLocaleDateString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell className="text-right font-black text-rose-500 tracking-tight">
                      {Number(order.total_price).toLocaleString("vi-VN")} đ
                    </TableCell>

                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wider ${statusConfig.className}`}
                      >
                        {statusConfig.label}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleViewOrderDetails(order.id)}
                          className="flex items-center gap-1.5 text-primary hover:text-primary-light hover:bg-primary/10 px-3 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer"
                        >
                          <Eye size={16} /> Xem
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <OrderFormDrawer
        isOpen={!!selectedOrder}
        onClose={handleCloseDetails}
        order={selectedOrder}
        onUpdateStatus={updateOrderStatus}
        isActionLoading={isActionLoading}
      />
    </div>
  );
};

export default OrderPage;
