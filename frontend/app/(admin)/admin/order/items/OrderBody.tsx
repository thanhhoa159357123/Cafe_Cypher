import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import Image from "next/image";
import { IAdminOrder } from "@/app/types/admin/order";
import { Eye } from "lucide-react";

interface OrderBodyProps {
  orders: IAdminOrder[];
  getStatusConfig: (status: string) => { label: string; className: string };
  handleViewOrderDetails: (orderId: number) => Promise<void>;
}

const OrderBody = ({
  orders,
  getStatusConfig,
  handleViewOrderDetails,
}: OrderBodyProps) => {
  return (
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
                    <div key={item.id} className="flex items-center gap-3">
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
  );
};

export default OrderBody;
