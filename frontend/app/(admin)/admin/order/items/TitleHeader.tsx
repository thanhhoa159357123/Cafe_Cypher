import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TitleHeader = () => {
  return (
    <TableHeader className="bg-muted/50 border-b border-border">
      <TableRow>
        <TableHead className="w-40 font-bold text-card-foreground">
          Mã Đơn
        </TableHead>
        <TableHead className="font-bold text-card-foreground min-w-50">
          Khách hàng
        </TableHead>
        <TableHead className="font-bold text-card-foreground min-w-64">
          Sản phẩm
        </TableHead>
        <TableHead className="font-bold text-card-foreground w-40">
          Thời gian
        </TableHead>
        <TableHead className="font-bold text-card-foreground text-right w-36">
          Tổng tiền
        </TableHead>
        <TableHead className="font-bold text-card-foreground text-center w-36">
          Trạng thái
        </TableHead>
        <TableHead className="text-right font-bold text-card-foreground w-28">
          Thao tác
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default TitleHeader
