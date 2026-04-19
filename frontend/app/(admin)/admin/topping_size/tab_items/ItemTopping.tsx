import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Edit, PlusCircle, Trash2, RefreshCw } from "lucide-react";
import { IToppingAdmin } from "@/app/types/admin/size_topping";

interface ItemToppingProps {
  toppings: IToppingAdmin[];
  onOpenCreate: (type: "size" | "topping") => void;
  onOpenEdit: (
    type: "size" | "topping",
    item: { id: number | string; name: string; price?: number },
  ) => void;
  onDelete: (id: number | string) => Promise<void>;
  onToggleStatus: (id: number | string) => Promise<void>;
  onRestore?: (id: number | string) => Promise<void>;
}

const ItemTopping = ({
  toppings,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleStatus,
  onRestore,
}: ItemToppingProps) => {
  return (
    <TabsContent value="toppings" className="mt-0 outline-none">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => onOpenCreate("topping")}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all text-sm font-bold shadow-md hover:shadow-lg"
        >
          <PlusCircle size={18} />
          Thêm Topping
        </button>
      </div>
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table className="table-fixed w-full">
          <TableCaption className="mb-4 text-muted-foreground">
            Danh sách topping và phụ thu tương ứng.
          </TableCaption>
          <TableHeader className="bg-secondary-light/30 border-b border-border">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-25 font-bold text-primary">Mã</TableHead>
              <TableHead className="font-bold text-primary w-auto">
                Tên Topping
              </TableHead>
              <TableHead className="font-bold text-primary text-right w-37.5">
                Phụ thu
              </TableHead>
              <TableHead className="font-bold text-primary text-right w-37.5">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-primary w-30">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/50">
            {toppings.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-accent-light/50 transition-colors"
              >
                <TableCell className="font-semibold text-muted-foreground">
                  {item.id}
                </TableCell>
                <TableCell className="font-black text-foreground">
                  {item.name}
                </TableCell>
                <TableCell className="text-right font-black text-primary">
                  {/* Dùng format VNĐ nếu có số thực tế, ví dụ: {item.price.toLocaleString()}đ */}
                  {item.price}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.status === "active"}
                      disabled={!!item.deleted_at}
                      onCheckedChange={() => onToggleStatus(item.id)}
                    />
                    <span
                      className={`text-[11px] font-bold uppercase ${item.deleted_at ? "text-red-500" : item.status === "active" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {item.deleted_at
                        ? "Đã xóa"
                        : item.status === "active"
                          ? "Đang bán"
                          : "Tạm ẩn"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    {!item.deleted_at ? (
                      <>
                        <button
                          onClick={() => onOpenEdit("topping", item)}
                          className="text-primary hover:text-primary-light hover:bg-secondary/20 p-1.5 rounded-md transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 p-1.5 rounded-md transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    ) : (
                      onRestore && (
                        <button
                          onClick={() => onRestore(item.id)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-100 p-1.5 rounded-md transition-all"
                          title="Khôi phục"
                        >
                          <RefreshCw size={18} />
                        </button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
};

export default ItemTopping;
