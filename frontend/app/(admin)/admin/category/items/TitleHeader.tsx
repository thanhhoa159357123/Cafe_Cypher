import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TitleHeader = () => {
  return (
    <TableHeader className="bg-muted/50 border-b border-border">
      <TableRow>
        <TableHead className="w-25 font-bold text-card-foreground">
          Mã DM
        </TableHead>
        <TableHead className="font-bold text-card-foreground w-62.5">
          Tên danh mục
        </TableHead>
        <TableHead className="font-bold text-card-foreground text-center">
          Thông tin
        </TableHead>
        <TableHead className="font-bold text-card-foreground text-center">
          Trạng thái
        </TableHead>
        <TableHead className="text-right font-bold text-card-foreground w-30">
          Thao tác
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TitleHeader;
