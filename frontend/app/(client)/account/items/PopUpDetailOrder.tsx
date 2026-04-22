// PopUpDetailOrder.tsx
"use client";
import { useOrderStore } from "@/app/store/client/useOrderStore";
import { useOrderHook } from "@/app/hooks/client/OrderHook";
import { useEffect, useState } from "react";

const PopUpDetailOrder = () => {
  const { isOpen, selectedOrder, closeDrawer } = useOrderStore();
  const { handleCancelOrder } = useOrderHook();
  const [isCanceling, setIsCanceling] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowAllItems(false), 300);
    }
  }, [isOpen]);

  const onCancel = async () => {
    if (!selectedOrder) return;
    const confirmCancel = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?",
    );
    if (!confirmCancel) return;

    setIsCanceling(true);
    const res = await handleCancelOrder(selectedOrder.id, "Khách hàng tự hủy");
    setIsCanceling(false);
    if (res.success) {
      closeDrawer();
    }
  };

  if (!selectedOrder) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-100 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeDrawer}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-card z-101 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } max-h-screen overflow-hidden`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">
                Chi tiết đơn hàng
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Mã đơn: #{selectedOrder.order_number} -{" "}
                <span
                  className={`font-semibold ${
                    selectedOrder.status === "pending"
                      ? "text-yellow-500"
                      : selectedOrder.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedOrder.status === "pending"
                    ? "Chờ xác nhận"
                    : selectedOrder.status === "cancelled"
                      ? "Đã hủy"
                      : selectedOrder.status}
                </span>
              </p>
            </div>
            <button
              onClick={closeDrawer}
              className="text-3xl hover:scale-110 transition-transform cursor-pointer text-card-foreground"
            >
              &times;
            </button>
          </div>

          {/* Nội dung cuộn */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            {/* 1. Thông tin giao hàng */}
            <div className="space-y-4">
              <h3 className="font-bold border-l-4 border-primary pl-2 text-lg flex items-center gap-2">
                <span>📦</span> Thông tin giao hàng
              </h3>
              <div className="bg-muted/30 p-5 rounded-xl space-y-3 border border-border/50">
                <div className="flex justify-between items-start text-base">
                  <span className="text-muted-foreground shrink-0">
                    📍 Địa chỉ:
                  </span>
                  <span className="font-semibold text-right max-w-[70%] wrap-break-word">
                    {selectedOrder.shipping.address || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">📞 SĐT:</span>
                  <span className="font-semibold">
                    {selectedOrder.shipping.phone || "Chưa cập nhật"}
                  </span>
                </div>
                {selectedOrder.shipping.note && (
                  <p className="text-sm text-destructive mt-2 italic bg-destructive/5 p-2 rounded">
                    💬 Ghi chú: {selectedOrder.shipping.note}
                  </p>
                )}
              </div>
            </div>

            {/* 2. Danh sách sản phẩm */}
            <div className="space-y-4">
              <h3 className="font-bold border-l-4 border-primary pl-2 text-lg flex items-center gap-2">
                <span>☕</span> Sản phẩm đã đặt ({selectedOrder.items.length})
              </h3>
              <div className="space-y-3">
                {(showAllItems
                  ? selectedOrder.items
                  : selectedOrder.items.slice(0, 3)
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/50 p-5 rounded-2xl border border-border/50 hover:shadow-md hover:bg-muted/70 transition-all cursor-pointer"
                  >
                    <div className="flex gap-5">
                      <img
                        src={item.image_url || "/placeholder.png"}
                        className="w-24 h-24 rounded-xl object-cover shadow-sm"
                        alt=""
                      />
                      <div className="flex-1 space-y-2">
                        <p className="font-bold text-base text-card-foreground leading-tight">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap gap-x-3 text-sm text-muted-foreground">
                          <span>📏 SIZE: {item.size}</span>
                          <span>🔢 SL: {item.quantity}</span>
                        </div>
                        {item.toppings && item.toppings.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.toppings.map((topping, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20"
                              >
                                + {topping}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">
                          {(
                            item.total || item.unit_price * item.quantity
                          ).toLocaleString()}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedOrder.items.length > 3 && (
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="w-full py-2.5 flex items-center justify-center text-sm text-primary font-semibold bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  {showAllItems
                    ? "🔼 Ẩn bớt sản phẩm"
                    : `🔽 Xem thêm ${selectedOrder.items.length - 3} sản phẩm khác...`}
                </button>
              )}
            </div>

            {/* 3. Thanh toán & Trạng thái */}
            <div className="space-y-4">
              <h3 className="font-bold border-l-4 border-primary pl-2 text-lg flex items-center gap-2">
                <span>💳</span> Thanh toán & Trạng thái
              </h3>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <p className="text-muted-foreground mb-1">Phương thức</p>
                  <p className="font-bold">
                    {selectedOrder.payment.method === "qr_code"
                      ? "💳 CHUYỂN KHOẢN QR"
                      : selectedOrder.payment.method === "cash"
                        ? "💵 TIỀN MẶT"
                        : "Chưa xác định"}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg border ${
                    selectedOrder.payment.status === "paid"
                      ? "bg-green-100 border-green-200 text-green-700"
                      : "bg-red-50 border-red-100 text-red-600"
                  }`}
                >
                  <p className="opacity-70 mb-1">Tình trạng</p>
                  <p className="font-bold">
                    {selectedOrder.payment.status === "paid"
                      ? "✅ ĐÃ THANH TOÁN"
                      : "⏳ CHƯA THANH TOÁN"}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Tổng tiền */}
            <div className="space-y-2 pt-2 border-t-2 border-dashed border-border">
              <h3 className="font-bold border-l-4 border-primary pl-2 text-lg flex items-center gap-2">
                <span>💰</span> Tổng tiền
              </h3>
              <div className="bg-primary/5 p-5 rounded-xl flex justify-between items-center">
                <span className="text-muted-foreground">Thành tiền:</span>
                <span className="text-3xl font-extrabold text-primary">
                  {selectedOrder.total_price.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex gap-4">
            {selectedOrder.status === "pending" && (
              <button
                onClick={onCancel}
                disabled={isCanceling}
                className="w-full py-4 bg-red-50 text-red-500 border border-red-200 font-bold rounded-xl hover:bg-red-100 transition-colors cursor-pointer text-lg disabled:opacity-50"
              >
                {isCanceling ? "Đang hủy..." : "Hủy đơn hàng"}
              </button>
            )}
            <button
              onClick={closeDrawer}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors cursor-pointer text-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpDetailOrder;
