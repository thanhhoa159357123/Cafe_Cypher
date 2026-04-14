// items/TitleHeader.tsx
"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TitleHeader = () => {
  return (
    <TableHeader className="bg-muted/30 border-b border-border">
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-15 font-semibold text-card-foreground text-center">
          ID
        </TableHead>
        <TableHead className="w-20 font-semibold text-card-foreground">
          Ảnh
        </TableHead>
        <TableHead className="font-semibold text-card-foreground">
          Sản phẩm
        </TableHead>
        <TableHead className="w-35 font-semibold text-card-foreground">
          Danh mục
        </TableHead>
        <TableHead className="w-40 font-semibold text-card-foreground">
          Tùy chọn
        </TableHead>
        <TableHead className="w-30 font-semibold text-card-foreground text-right">
          Giá bán
        </TableHead>
        <TableHead className="w-30 font-semibold text-card-foreground text-right">
          Trạng thái
        </TableHead>
        <TableHead className="w-35 text-right font-semibold text-card-foreground">
          Thao tác
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TitleHeader;
