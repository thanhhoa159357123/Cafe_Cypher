import React from "react";
import { IProduct, ISize, ITopping } from "@/app/types/product";
import { Coffee, Candy } from "lucide-react";

interface SizeAndToppingProps {
  product: IProduct;
  sizes: ISize[];
  toppings: ITopping[];
}

const SizeAndTopping = ({ product, sizes, toppings }: SizeAndToppingProps) => {
  console.log("Sizes: ", sizes);
  console.log("Toppings: ", toppings);

  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <span className="text-sm font-medium">Chọn Size (Bắt buộc): </span>
        <div className="flex flex-row flex-wrap gap-2">
          {sizes?.map((size) => (
            <div
              key={size.size_id}
              className={`flex flex-row items-center px-3 py-2 justify-center gap-1 shadow-xs rounded-lg border transition 
                duration-300 ease-in-out cursor-pointer`}
            >
              <span className="text-sm font-semibold whitespace-nowrap">
                {size.size_name} + {size.size_price - product.price} đ
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Chọn Topping (Tối đa 3): </span>
        <div className="flex flex-row flex-wrap gap-2 max-w-full">
          {toppings?.map((topping) => {
            return (
              <div
                key={topping.topping_id}
                className={`flex flex-row items-center px-3 py-2 justify-center gap-1 shadow-xs rounded-lg border transition-all duration-300 shrink-0`}
              >
                <span className="text-sm font-semibold whitespace-nowrap">
                  {topping.topping_name} +{" "}
                  {topping.topping_price.toLocaleString("vi-VN")} đ
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SizeAndTopping;
