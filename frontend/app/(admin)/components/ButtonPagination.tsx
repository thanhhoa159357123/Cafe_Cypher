// items/ButtonPagination.tsx

"use client";

import { PaginationMeta } from "@/app/types/admin/product";

interface ButtonPaginationProps {
  meta: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ButtonPagination = ({
  meta,
  currentPage,
  onPageChange,
}: ButtonPaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-card border border-border shadow-sm rounded-2xl gap-4">
      <span className="text-sm text-muted-foreground">
        Trang{" "}
        <span className="font-bold text-card-foreground">
          {meta.current_page}
        </span>{" "}
        /{" "}
        <span className="font-bold text-card-foreground">{meta.last_page}</span>
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || meta.last_page === 0}
          className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer active:scale-95"
        >
          Trước
        </button>
        <div className="min-w-10 text-center px-3 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold border border-primary/20">
          {currentPage}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === meta.last_page || meta.last_page === 0}
          className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer active:scale-95"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ButtonPagination;
