import { ICategory } from "@/app/types/base/category";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Edit, FolderTree, Trash2, RefreshCw } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CategoryBodyProps {
  categories: ICategory[];
  handleOpenEdit: (category: ICategory) => void;
  handleDelete: (id: number | string) => Promise<void>;
  handleToggleStatus: (id: number | string) => Promise<void>;
  handleRestore?: (id: number | string) => Promise<void>;
}

const CategoryBody = ({
  categories,
  handleOpenEdit,
  handleDelete,
  handleToggleStatus,
  handleRestore,
}: CategoryBodyProps) => {
  return (
    <TableBody className="divide-y divide-border">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          {/* Hàng danh mục cha */}
          <TableRow className="bg-muted/10 hover:bg-muted/30 transition-colors">
            {/* Mã DM - cố định độ rộng */}
            <TableCell className="w-24 font-mono text-xs font-semibold text-muted-foreground">
              #{category.id}
            </TableCell>

            {/* Tên danh mục */}
            <TableCell className="font-bold text-card-foreground">
              <div className="flex items-center gap-2">
                <FolderTree size={16} className="text-primary shrink-0" />
                <span className="truncate">{category.name}</span>
              </div>
            </TableCell>

            {/* Phân cấp */}
            <TableCell className="w-32">
              <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full whitespace-nowrap">
                DANH MỤC CHA
              </span>
            </TableCell>

            {/* Trạng thái */}
            <TableCell className="w-36">
              <div className="flex items-center gap-2">
                <Switch
                  checked={category.status === "active"}
                  disabled={!!category.deleted_at}
                  onCheckedChange={() => handleToggleStatus(category.id)}
                  className="data-[state=checked]:bg-primary"
                />
                <span
                  className={`text-[11px] font-semibold whitespace-nowrap ${
                    category.deleted_at
                      ? "text-red-500"
                      : category.status === "active"
                        ? "text-emerald-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {category.deleted_at
                    ? "Đã xóa"
                    : category.status === "active"
                      ? "Đang bán"
                      : "Tạm ẩn"}
                </span>
              </div>
            </TableCell>

            {/* Thao tác */}
            <TableCell className="w-24 text-right">
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => handleOpenEdit(category)}
                  className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                  title="Chỉnh sửa"
                >
                  <Edit size={18} />
                </button>
                {!category.deleted_at ? (
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                ) : (
                  handleRestore && (
                    <button
                      onClick={() => handleRestore(category.id)}
                      className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-all cursor-pointer"
                      title="Khôi phục"
                    >
                      <RefreshCw size={18} />
                    </button>
                  )
                )}
              </div>
            </TableCell>
          </TableRow>

          {/* Hàng danh mục con */}
          {category.children &&
            category.children.map((child) => (
              <TableRow
                key={child.id}
                className="hover:bg-muted/20 transition-colors border-t border-border/50"
              >
                {/* Mã DM con - thụt lề */}
                <TableCell className="w-24 pl-6 font-mono text-xs font-medium text-muted-foreground">
                  #{child.id}
                </TableCell>

                {/* Tên DM con - thụt lề */}
                <TableCell>
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
                    </div>
                    <span className="font-medium text-card-foreground">
                      {child.name}
                    </span>
                  </div>
                </TableCell>

                {/* Phân cấp */}
                <TableCell className="w-32">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border whitespace-nowrap">
                    Con của {category.name}
                  </span>
                </TableCell>

                {/* Trạng thái */}
                <TableCell className="w-36">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={child.status === "active"}
                      disabled={!!child.deleted_at}
                      onCheckedChange={() => handleToggleStatus(child.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <span
                      className={`text-[11px] font-semibold whitespace-nowrap ${
                        child.deleted_at
                          ? "text-red-500"
                          : child.status === "active"
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {child.deleted_at
                        ? "Đã xóa"
                        : child.status === "active"
                          ? "Đang bán"
                          : "Tạm ẩn"}
                    </span>
                  </div>
                </TableCell>

                {/* Thao tác */}
                <TableCell className="w-24 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => handleOpenEdit(child)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <Edit size={16} />
                    </button>
                    {!child.deleted_at ? (
                      <button
                        onClick={() => handleDelete(child.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      handleRestore && (
                        <button
                          onClick={() => handleRestore(child.id)}
                          className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-all cursor-pointer"
                          title="Khôi phục"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default CategoryBody;
