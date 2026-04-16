import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TitleHeader = () => {
  return (
    <TableHeader className="bg-muted/50 border-b border-border">
      <TableRow>
        <TableHead className="w-24 font-bold text-card-foreground">
          Mã DM
        </TableHead>
        <TableHead className="font-bold text-card-foreground">
          Tên danh mục
        </TableHead>
        <TableHead className="w-32 font-bold text-card-foreground text-center">
          Phân cấp
        </TableHead>
        <TableHead className="w-36 font-bold text-card-foreground text-center">
          Trạng thái
        </TableHead>
        <TableHead className="w-24 text-right font-bold text-card-foreground">
          Thao tác
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TitleHeader;
