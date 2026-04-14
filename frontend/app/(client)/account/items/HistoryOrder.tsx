// HistoryOrder.tsx
import { IOrder } from "@/app/types/base/order";
import { useOrderStore } from "@/app/store/client/useOrderStore";

interface HistoryOrderProps {
  orders: IOrder[] | null;
}

const HistoryOrder = ({ orders }: HistoryOrderProps) => {
  const openDrawer = useOrderStore((state) => state.openDrawer);
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
                  <td className="py-5 text-sm text-muted-foreground">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-bold text-card-foreground text-sm tracking-tight">
                        {order.created_at.split(" ")[0]}
                      </span>
                      <div className="flex items-center text-[11px] text-muted-foreground font-medium">
                        <span className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded mr-1.5">
                          {order.created_at.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image_url || "/placeholder.png"}
                          className="h-16 w-16 rounded-lg border-2 border-card object-cover shadow-sm"
                          alt="product"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-5 text-right font-bold text-card-foreground">
                    {order.total_price.toLocaleString()}đ
                  </td>
                  <td className="py-5 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-primary/10 text-primary">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5">
                    <button
                      onClick={() => openDrawer(order)}
                      className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                    </button>
                    <button className="px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors font-medium ml-2 cursor-pointer">
                      Hủy đơn hàng
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
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
