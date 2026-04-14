import { IProduct, ITopping } from "@/app/types/base/product";
import React from "react";

interface CheckBoxToppingProps {
  value: ITopping[]; // Thay đổi kiểu dữ liệu nếu cần
  toggleTopping: (topping: ITopping) => void; // Hàm để toggle topping
  form: Partial<IProduct>; // Truyền formData để kiểm tra trạng thái checked
}

const CheckBoxTopping = ({
  value,
  toggleTopping,
  form,
}: CheckBoxToppingProps) => {
  return (
    <div className="space-y-3 pt-2">
      <label className="text-sm font-semibold">Tùy chọn Toppings</label>
      {value.length === 0 ? (
        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl border border-dashed">
          Chưa có dữ liệu toppings.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {value.map((topping) => {
            const isChecked = form.toppings?.some((t) => t.id === topping.id);
            return (
              <label
                key={topping.id}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                  isChecked ? "border-primary bg-primary/10" : "hover:bg-muted"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleTopping(topping)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm select-none">
                    {topping.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    +{topping.price.toLocaleString()}đ
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckBoxTopping;
