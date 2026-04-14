import React from "react";
import { ICategory } from "@/app/types/base/category";

interface CategorySelectProps {
  value: number | string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableCategories: ICategory[];
}

const CategorySelect = ({
  value,
  onChange,
  availableCategories,
}: CategorySelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Danh mục *</label>
      <select
        name="category_id"
        value={value || ""}
        onChange={onChange}
        className="w-full p-2.5 rounded-xl border bg-background text-foreground focus:ring-1 focus:ring-primary"
      >
        <option value="" disabled>
          -- Chọn danh mục --
        </option>
        {availableCategories.map((cat) => (
          <optgroup key={cat.id} label={cat.name}>
            <option value={cat.id}>{cat.name} (Gốc)</option>
            {cat.children &&
              cat.children.map((child) => (
                <option key={child.id} value={child.id}>
                  {`-- ${child.name}`}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
