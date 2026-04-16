import { ICategory } from "@/app/types/base/category";
import { Filter, FilterX, Search } from "lucide-react";
import React from "react";

interface FilterProductProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  categories: ICategory[];
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const FilterProduct = ({
  search,
  setSearch,
  status,
  setStatus,
  categoryId,
  setCategoryId,
  categories,
  onApplyFilter,
  onClearFilter,
}: FilterProductProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApplyFilter();
      }}
      className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-end"
    >
      {/* Ô tìm kiếm */}
      <div className="flex-1 w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Tìm kiếm
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Tên sản phẩm..."
            className="pl-9 pr-4 py-2 w-full rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Chọn danh mục */}
      <div className="w-full md:w-48 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Danh mục
        </label>
        <select
          className="px-3 py-2 w-full rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm cursor-pointer"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn trạng thái */}
      <div className="w-full md:w-40 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Trạng thái
        </label>
        <select
          className="px-3 py-2 w-full rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Đã ẩn</option>
        </select>
      </div>

      {/* Nút hành động */}
      <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <button
          type="submit"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md"
        >
          <Filter size={16} /> Lọc
        </button>

        {/* Nút hủy bộ lọc (Chỉ hiện khi có dữ liệu lọc) */}
        <button
          type="button"
          onClick={onClearFilter}
          className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
          title="Xóa bộ lọc"
        >
          <FilterX size={18} />
        </button>
      </div>
    </form>
  );
};

export default FilterProduct;
