// import { OrderItem } from "@/app/types/order";
import { Loader2 } from "lucide-react";
import React from "react";
import Image from "next/image";

interface OrderSummaryProps {
  //   checkoutItems: OrderItem[];
  isLoading: boolean;
  displayTotalPrice: number;
  handlePlaceOrder: () => void;
}

const OrderSummary = ({
  //   checkoutItems,
  isLoading,
  displayTotalPrice,
  handlePlaceOrder,
}: OrderSummaryProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
        {/*
        <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
          {checkoutItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-3 border-b border-border/50 last:border-0"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={item.product.imageUrl || "/placeholder.png"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.size.name}
                  {(item.toppings ?? []).length > 0 &&
                    ` + ${item.toppings?.length} topping`}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm font-semibold">x{item.quantity}</p>
                  <p className="text-sm font-bold text-primary">
                    {item.totalPriceItems.toLocaleString()}₫
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        */}

        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Tạm tính</span>
            <span>{displayTotalPrice.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Phí vận chuyển</span>
            <span>0₫</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 text-foreground">
            <span>Tổng cộng</span>
            <span className="text-primary">
              {displayTotalPrice.toLocaleString()}₫
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
