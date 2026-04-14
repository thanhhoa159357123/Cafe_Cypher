import { Loader2 } from "lucide-react";
import React from "react";
import Image from "next/image";
import { ICartItem } from "@/app/types/client/cart";
import { IBuyNowItemState } from "@/app/types/client/order";
import { ITopping } from "@/app/types/client/product";

interface OrderSummaryProps {
  items?: (ICartItem | IBuyNowItemState | any)[];
  isLoading: boolean;
  displayTotalPrice: number;
  handlePlaceOrder: () => void;
}

const OrderSummary = ({
  items = [],
  isLoading,
  displayTotalPrice,
  handlePlaceOrder,
}: OrderSummaryProps) => {
  console.log("item hiện tại: ", items);
  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

        <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
          {items.map((rawItem, index) => {
            const isBuyNow = rawItem.checkout_type === "buy_now";
            const isCartItem = !isBuyNow;

            // 2. Adapter: Dịch 2 ngôn ngữ về 1 chuẩn duy nhất để render
            const id = isCartItem ? rawItem.id : `buynow-${rawItem.product_id}`;
            const name = isCartItem
              ? rawItem.product?.name
              : rawItem.product_name;
            const image = isCartItem
              ? rawItem.product?.image
              : rawItem.image_url;
            const sizeName = isCartItem
              ? rawItem.size?.name
              : rawItem.size_name;
            const quantity = rawItem.quantity || 1;

            // Lấy danh sách tên topping để hiển thị (nếu có)
            const toppingNames = isCartItem
              ? rawItem.toppings?.map((t: ITopping) => t.name) || []
              : rawItem.topping_names || [];

            // Tính giá 1 sản phẩm (unit_price)
            let unitPrice = 0;
            if (isCartItem) {
              const baseP = Number(rawItem.product?.price || 0);
              const sizeP = Number(rawItem.size?.price || 0);
              const topP = (rawItem.toppings || []).reduce(
                (sum: number, t: any) => sum + Number(t.price),
                0,
              );
              unitPrice = baseP + sizeP + topP;
            } else {
              unitPrice = Number(rawItem.unit_price || 0);
            }

            // 3. Render giao diện với cục data đã được "dịch" sạch sẽ
            return (
              <div
                key={id}
                className="flex gap-4 py-3 border-b border-border/50 last:border-0"
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={image || "/placeholder.png"}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {[sizeName, toppingNames.join(", ")]
                      .filter(Boolean)
                      .join(" + ")}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm font-semibold">x{quantity}</p>
                    <p className="text-sm font-bold text-primary">
                      {unitPrice.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Tạm tính</span>
            <span>{displayTotalPrice.toLocaleString("vi-VN")}₫</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 text-foreground">
            <span>Tổng cộng</span>
            <span className="text-primary">
              {displayTotalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isLoading}
          className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Đặt Hàng Ngay"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(OrderSummary);
