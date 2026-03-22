import React from "react";
import { IProduct, ISize, ITopping } from "@/app/types/product";
import { Coffee, Candy, Check } from "lucide-react";

interface SizeAndToppingProps {
  product: IProduct;
  sizes: ISize[];
  toppings: ITopping[];

  selectedSize: ISize | null;
  setSelectedSize: (size: ISize | null) => void;
  selectedToppings: ITopping[];
  setSelectedToppings: (topping: ITopping) => void;
}

const SizeAndTopping = ({
  product,
  sizes,
  toppings,
  selectedSize,
  setSelectedSize,
  selectedToppings,
  setSelectedToppings,
}: SizeAndToppingProps) => {
  const isMaxToppings = selectedToppings.length >= 3;

  return (
    <div className="flex flex-col gap-6">
      {/* SIZE SECTION */}
      {product.sizes.length > 0 && (
        <div className="flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Chọn Size <span className="text-destructive">*</span>
            </span>
          </div>

          <div className="flex flex-row flex-wrap gap-3">
            {sizes?.map((size) => {
              const isSelected = selectedSize?.size_id === size.size_id;
              const priceDiff = size.size_price - product.price;

              return (
                <div
                  key={size.size_id}
                  onClick={() => setSelectedSize(size)}
                  className={`
                  flex items-center px-4 py-3 rounded-xl border-2 transition-colors duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "bg-primary border-primary text-primary-foreground shadow-sm"
                      : "bg-background border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }
                `}
                >
                  <div className="flex items-center gap-2">
                    {isSelected && <Check className="w-4 h-4" />}
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {size.size_name}
                    </span>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-background/20 ${
                        isSelected
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      +{priceDiff.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOPPING SECTION */}
      {product.toppings.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Candy className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Chọn Topping
            </span>
            <span
              className={`text-sm ${
                isMaxToppings
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {isMaxToppings ? "(Đã chọn tối đa 3)" : "(Tối đa 3)"}
            </span>
          </div>

          <div className="flex flex-row flex-wrap gap-3 max-w-full">
            {toppings?.map((topping) => {
              const isSelected = selectedToppings.some(
                (t) => t.topping_id === topping.topping_id,
              );
              const isDisabled = isMaxToppings && !isSelected;

              return (
                <div
                  key={topping.topping_id}
                  onClick={() => !isDisabled && setSelectedToppings(topping)}
                  className={`
                  flex items-center px-4 py-3 rounded-xl border-2 transition-colors duration-200
                  ${
                    isDisabled
                      ? "bg-background border-border/50 text-muted-foreground/50 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary border-primary text-primary-foreground shadow-sm cursor-pointer"
                        : "bg-background border-border text-foreground hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
                  }
                `}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {topping.topping_name}
                    </span>
                    <span className="text-xs font-medium">
                      +{topping.topping_price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeAndTopping;
