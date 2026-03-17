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
  return (
    <div className="flex flex-col gap-6">
      {/* SIZE SECTION */}
      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2">
          <Coffee className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-gray-700">
            Chọn Size <span className="text-red-500">*</span>
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
                  relative flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-300 
                  cursor-pointer group hover:scale-105 active:scale-95
                  ${
                    isSelected
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200"
                      : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <Check className="w-4 h-4 animate-in fade-in zoom-in" />
                  )}
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {size.size_name}
                  </span>
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-orange-100 text-orange-600"
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

      {/* TOPPING SECTION */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Candy className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-gray-700">
            Chọn Topping{" "}
          </span>
          <span className="text-gray-400 font-normal">(Tối đa 3)</span>
          {selectedToppings.length >= 3 && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg animate-pulse border border-amber-200">
              <span className="text-xs font-medium">
                ⚡ Bạn đã chọn tối đa 3 loại topping. Hãy bỏ chọn để thay đổi!
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-row flex-wrap gap-3 max-w-full">
          {toppings?.map((topping) => {
            const isSelected = selectedToppings.some(
              (t) => t.topping_id === topping.topping_id,
            );
            const isMaxReached = selectedToppings.length >= 3 && !isSelected;

            return (
              <div
                key={topping.topping_id}
                onClick={() => !isMaxReached && setSelectedToppings(topping)}
                className={`
                  relative flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-300
                  ${
                    !isMaxReached && !isSelected
                      ? "cursor-pointer hover:scale-105 active:scale-95 group"
                      : ""
                  }
                  ${
                    isSelected
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-105"
                      : isMaxReached
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60 grayscale"
                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <Check className="w-4 h-4 animate-in fade-in zoom-in" />
                  )}
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {topping.topping_name}
                  </span>
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : isMaxReached
                          ? "bg-gray-200 text-gray-500"
                          : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    +{topping.topping_price.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                {/* Tooltip khi không thể chọn */}
                {isMaxReached && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                    Đã đạt giới hạn 3 topping
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SizeAndTopping;
