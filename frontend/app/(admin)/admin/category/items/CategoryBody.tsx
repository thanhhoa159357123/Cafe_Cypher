import { ICategory } from "@/app/types/base/category";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Edit, FolderTree, Trash2 } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CategoryBodyProps {
  categories: ICategory[];
  handleOpenEdit: (category: ICategory) => void;
  handleDelete: (id: number | string) => Promise<void>;

  handleToggleStatus: (id: number | string) => Promise<void>;
}

const CategoryBody = ({
  categories,
  handleOpenEdit,
  handleDelete,
  handleToggleStatus,
}: CategoryBodyProps) => {
  return (
    <TableBody className="divide-y divide-border">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          {/* Hàng danh mục cha */}
          <TableRow className="bg-muted/20 hover:bg-muted/40 transition-colors">
            <TableCell className="font-semibold text-muted-foreground italic">
              #{category.id}
            </TableCell>
            <TableCell className="font-black text-card-foreground uppercase flex items-center gap-2">
              <FolderTree size={16} className="text-primary" />
              {category.name}
            </TableCell>
            <TableCell className="text-center">
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                DANH MỤC CHA
              </span>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Switch
                  checked={category.status === "active"}
                  onCheckedChange={() => handleToggleStatus(category.id)} // Hàm toggle nãy anh em mình bàn
                />
                <span
                  className={`text-[11px] font-bold uppercase ${category.status === "active" ? "text-green-600" : "text-muted-foreground"}`}
                >
                  {category.status === "active" ? "Đang bán" : "Tạm ẩn"}
                </span>
              </div>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-1.5 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(category)}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </TableCell>
          </TableRow>

          {/* Hàng danh mục con */}
          {category.children &&
            category.children.map((child) => (
              <TableRow
                key={child.id}
                className="hover:bg-muted/20 transition-colors"
              >
                <TableCell className="pl-8 text-muted-foreground text-xs font-medium">
                  #{child.id}
                </TableCell>
                <TableCell className="pl-12 font-semibold text-card-foreground flex items-center gap-2">
                  <div className="w-2 h-2 border-l border-b border-border mr-1 mb-1"></div>
                  {child.name}
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border">
                    Con của {category.name}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={child.status === "active"}
                      onCheckedChange={() => handleToggleStatus(child.id)}
                      className="cursor-pointer"
                    />
                    <span
                      className={`text-[11px] font-bold uppercase ${child.status === "active" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {child.status === "active" ? "Đang bán" : "Tạm ẩn"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(child)}
                      className="text-muted-foreground hover:text-primary p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-primary/10"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(child.id)}
                      className="text-muted-foreground hover:text-destructive p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                    </button>
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
