import { Filter, FilterX, Search } from "lucide-react";
import React from "react";

interface FilterOrderProps {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  statusVal: string;
  setStatusVal: React.Dispatch<React.SetStateAction<string>>;
  dateFrom: string;
  setDateFrom: React.Dispatch<React.SetStateAction<string>>;
  dateTo: string;
  setDateTo: React.Dispatch<React.SetStateAction<string>>;
  onSubmitFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  onClearFilter: () => void;
}

const FilterOrder = ({
  searchWord,
  setSearchWord,
  statusVal,
  setStatusVal,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onSubmitFilter,
  onClearFilter,
}: FilterOrderProps) => {
  return (
    <form
      onSubmit={onSubmitFilter}
      className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-3 items-end"
    >
      {/* Tìm theo tên */}
      <div className="flex-1 min-w-50 space-y-1">
        <label className="text-xs font-semibold text-muted-foreground ml-1">
          Tìm khách hàng
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Nhập tên..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
      </div>

      {/* Lọc Trạng thái */}
      <div className="w-full flex flex-col sm:w-auto space-y-1">
        <label className="text-xs font-semibold text-muted-foreground ml-1">
          Trạng thái
        </label>
        <select
          value={statusVal}
          onChange={(e) => setStatusVal(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="processing">Đang pha chế</option>
          <option value="shipping">Đang giao hàng</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Lọc Từ ngày */}
      <div className="w-full flex flex-col sm:w-auto space-y-1">
        <label className="text-xs font-semibold text-muted-foreground ml-1">
          Từ ngày
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full sm:w-35 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
        />
      </div>

      {/* Lọc Đến ngày */}
      <div className="w-full flex flex-col sm:w-auto space-y-1">
        <label className="text-xs font-semibold text-muted-foreground ml-1">
          Đến ngày
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="w-full sm:w-35 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
        />
      </div>

      {/* Cụm Nút bấm */}
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

export default FilterOrder;
