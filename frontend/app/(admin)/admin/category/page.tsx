"use client";

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
import { PlusCircle, Edit, Trash2, FolderTree } from "lucide-react";
import { useCategoryStore } from "@/app/store/client/useCategoryStore";

const CategoryPage = () => {
  const { categories } = useCategoryStore();
  console.log("Categories:", categories);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <FolderTree size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-card-foreground">
              Danh mục món
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Phân loại thực đơn để khách hàng dễ tìm kiếm.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all text-sm font-bold shadow-md hover:shadow-lg cursor-pointer">
          <PlusCircle size={18} />
          Thêm danh mục
        </button>
      </div>

      {/* Bảng danh mục */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4 text-muted-foreground">
            Danh sách phân loại nhóm món ăn và thức uống.
          </TableCaption>
          <TableHeader className="bg-muted/50 border-b border-border">
            <TableRow>
              <TableHead className="w-25 font-bold text-card-foreground">
                Mã DM
              </TableHead>
              <TableHead className="font-bold text-card-foreground w-62.5">
                Tên danh mục
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-center">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-card-foreground w-30">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {categories.map((category) => (
              <React.Fragment key={category.category_id}>
                {/* Hàng danh mục cha */}
                <TableRow className="bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="font-semibold text-muted-foreground italic">
                    #{category.category_id}
                  </TableCell>
                  <TableCell className="font-black text-card-foreground uppercase flex items-center gap-2">
                    <FolderTree size={16} className="text-primary" />
                    {category.category_name}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                      DANH MỤC CHA
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors cursor-pointer">
                        <Edit size={18} />
                      </button>
                      <button className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Hàng danh mục con */}
                {category.children &&
                  category.children.map((child) => (
                    <TableRow
                      key={child.category_id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="pl-8 text-muted-foreground text-xs">
                        #{child.category_id}
                      </TableCell>
                      <TableCell className="pl-12 font-medium text-card-foreground flex items-center gap-2">
                        <div className="w-2 h-2 border-l border-b border-border mr-1 mb-1"></div>
                        {child.category_name}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-muted-foreground text-[10px]">
                          Con của {category.category_name}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-muted-foreground hover:text-primary p-1 transition-colors cursor-pointer">
                            <Edit size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryPage;
