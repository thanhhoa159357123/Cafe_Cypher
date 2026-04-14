import { IProduct, ISize } from "@/app/types/base/product";
import React from "react";

interface CheckBoxSizeProps {
  value: ISize[]; // Thay đổi kiểu dữ liệu phù hợp với sizes
  toggleSize: (size: ISize) => void; // Thay đổi kiểu dữ liệu phù hợp với size
  handleSizePriceChange: (sizeId: number | string, price: number) => void;
  form: Partial<IProduct>; // Thay đổi kiểu dữ liệu phù hợp với formData
}

const CheckBoxSize = ({
  value,
  toggleSize,
  handleSizePriceChange,
  form,
}: CheckBoxSizeProps) => {
  return (
    <div className="space-y-3 pt-2 pb-8">
      <label className="text-sm font-semibold">
        Các thiết lập Kích thước (Sizes)
      </label>
      {value.length === 0 ? (
        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl border border-dashed">
          Chưa có dữ liệu kích thước.
        </p>
      ) : (
        <div className="space-y-3">
          {value.map((size) => {
            const isChecked = form.sizes?.some((s: any) => s.id === size.id);
            const selectedSize = form.sizes?.find((s: any) => s.id === size.id);

            return (
              <div
                key={size.id}
                className={`flex justify-between items-center p-3 border rounded-xl transition-colors ${
                  isChecked
                    ? "border-primary bg-primary/5"
                    : "hover:border-border/80"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSize(size)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="font-semibold">{size.name}</span>
                </label>

                {isChecked && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">
                      Giá bán:
                    </label>
                    <input
                      type="number"
                      value={
                        selectedSize?.price === 0 ? "" : selectedSize?.price
                      }
                      onChange={(e) =>
                        handleSizePriceChange(size.id, Number(e.target.value))
                      }
                      className="w-24 p-1.5 text-right rounded-md border bg-background text-sm focus:ring-1 focus:ring-primary"
                      placeholder="0"
                    />
                    <span className="text-xs text-muted-foreground">VNĐ</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckBoxSize;
