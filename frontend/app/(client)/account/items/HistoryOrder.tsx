// HistoryOrder.tsx
import { IOrder } from "@/app/types/base/order";
import { useOrderStore } from "@/app/store/client/useOrderStore";
import { useOrderHook } from "@/app/hooks/client/OrderHook";
import { Eye, XCircle } from "lucide-react";

interface HistoryOrderProps {
  orders: IOrder[] | null;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case "pending":
      return { text: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-600" };
    case "processing":
      return { text: "Đang chuẩn bị", color: "bg-blue-100 text-blue-600" };
    case "shipping":
      return { text: "Đang giao", color: "bg-orange-100 text-orange-600" };
    case "completed":
      return { text: "Hoàn thành", color: "bg-green-100 text-green-600" };
    case "cancelled":
      return { text: "Đã hủy", color: "bg-red-100 text-red-600" };
    default:
      return { text: status, color: "bg-gray-100 text-gray-600" };
  }
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} - ${d.toLocaleDateString("vi-VN")}`;
  } catch {
    return dateStr;
  }
};

const HistoryOrder = ({ orders }: HistoryOrderProps) => {
  const openDrawer = useOrderStore((state) => state.openDrawer);
  const { handleCancelOrder } = useOrderHook();
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-2xl font-bold text-card-foreground">
          Lịch sử đơn hàng
        </h3>
        <span className="text-sm text-muted-foreground">
          Tổng cộng: {orders?.length || 0} đơn
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-muted-foreground text-xs uppercase tracking-widest border-b border-border">
              <th className="pb-4 font-medium">Mã Đơn</th>
              <th className="pb-4 font-medium">Ngày Đặt</th>
              <th className="pb-4 font-medium">Sản Phẩm</th>
              <th className="pb-4 font-medium text-right">Tổng Tiền</th>
              <th className="pb-4 font-medium text-center">Trạng Thái</th>
              <th className="pb-4 font-medium">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-muted/50 transition-colors group"
                >
                  <td className="py-5">
                    <span className="font-mono text-sm font-bold text-primary hover:underline cursor-pointer">
                      {order.order_number}
                    </span>
                  </td>
                  <td className="py-5 text-sm font-medium text-foreground">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-5">
                    <div className="flex flex-wrap gap-2 items-center">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image_url || "/placeholder.png"}
                          className="h-12 w-12 rounded-lg border border-border object-cover shadow-sm"
                          alt="product"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <button
                          onClick={() => openDrawer(order)}
                          className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                          title="Xem thêm"
                        >
                          +{order.items.length - 3}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-5 text-right font-bold text-card-foreground">
                    {order.total_price.toLocaleString()}đ
                  </td>
                  <td className="py-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusInfo(order.status).color}`}
                    >
                      {getStatusInfo(order.status).text}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDrawer(order)}
                        title="Xem chi tiết"
                        className="p-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {order.status === "pending" && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Bạn có chắc chắn muốn hủy đơn hàng này không?",
                              )
                            ) {
                              handleCancelOrder(order.id, "Khách hàng tự hủy");
                            }
                          }}
                          title="Hủy đơn hàng"
                          className="p-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground italic"
                >
                  Chưa có dữ liệu đơn hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryOrder;
