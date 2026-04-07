import { ICartItem } from "@/app/types/client/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import QuantityInput from "./QuantityInput";
import {
  calculateSubtotal,
  calculateToppingsPrice,
  calculateUnitPrice,
} from "@/lib/cartUtils";
import { AnimatePresence, motion } from "motion/react";

interface CartItemProps {
  cartItems: ICartItem[] | [];
  handleUpdateQuantity: (cartItemId: number | string, quantity: number) => void;
  handleRemoveItem: (cartItemId: number | string) => void;
}

const CartItem = ({
  cartItems,
  handleUpdateQuantity,
  handleRemoveItem,
}: CartItemProps) => {
  return (
    <div className="space-y-4">
      {cartItems.length > 0 && (
        <AnimatePresence mode="popLayout">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                height: 0,
                marginBottom: 0,
                overflow: "hidden",
              }}
              transition={{ duration: 0.25 }}
              className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow origin-top"
            >
              {/* Product Image */}
              <div className="relative w-20 h-20 shrink-0 mt-1">
                <Image
                  src={item.product.image ?? "/placeholder.png"}
                  alt={item.product.name}
                  sizes="(max-width: 768px) 100px, 150px"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  {/* Tên Món Chính Gốc */}
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h3 className="font-bold text-foreground text-base">
                      {item.product.name}
                    </h3>
                  </div>

                  {/* Bảng Chi Tiết (Receipt Style) */}
                  <div className="text-xs text-muted-foreground w-full bg-accent/20 p-2.5 rounded-lg border border-border/50">
                    <div className="flex flex-col gap-1.5 font-medium">
                      {/* Dòng giá gốc */}
                      <div className="flex justify-between items-center bg-transparent">
                        <span>• Giá gốc</span>
                        <span>{item.product.price.toLocaleString()}₫</span>
                      </div>

                      {/* Dòng Size */}
                      {item.size && (
                        <div className="flex justify-between items-center text-primary/80">
                          <span>• Size {item.size.name}</span>
                          <span>
                            {item.size.price > item.product.price ? "+" : ""}
                            {(
                              item.size.price - item.product.price
                            ).toLocaleString()}
                            ₫
                          </span>
                        </div>
                      )}

                      {/* Dòng Topping */}
                      {item.toppings && item.toppings.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {item.toppings.map((topping) => (
                            <div
                              key={topping.id}
                              className="flex justify-between items-center text-primary/80 pl-2 border-l border-border ml-1.5"
                            >
                              <span>+ {topping.name}</span>
                              <span>+{topping.price.toLocaleString()}₫</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-0.5 w-full bg-border/80 my-1"></div>

                      {/* Đơn giá tổng hợp */}
                      <div className="flex justify-between items-center font-bold text-sm text-foreground">
                        <span>Đơn giá:</span>
                        <span>
                          {calculateUnitPrice(item).toLocaleString()}₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Khu vực Số lượng & Nút Xoá */}
                <div className="flex items-center justify-between mt-4">
                  <QuantityInput
                    itemId={item.id}
                    currentQuantity={item.quantity}
                    onUpdate={handleUpdateQuantity}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-200 cursor-pointer"
                    title="Xoá món này"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* THÀNH TIỀN TỔNG */}
                <div className="flex justify-between items-end mt-3 pt-3 border-t border-dashed border-border">
                  <span className="text-sm font-medium text-foreground tracking-wide">
                    TỔNG THÀNH TIỀN:
                  </span>
                  <div className="flex flex-col items-end">
                    {item.quantity > 1 && (
                      <span className="text-[12px] text-muted-foreground mr-1">
                        ({item.quantity} x{" "}
                        {calculateUnitPrice(item).toLocaleString()}₫)
                      </span>
                    )}
                    <span className="text-xl font-black text-primary">
                      {calculateSubtotal(item).toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CartItem;
