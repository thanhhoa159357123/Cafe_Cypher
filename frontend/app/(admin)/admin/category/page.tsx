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
import { CategoryHook } from "@/app/hooks/admin/CategoryHook";
import CategoryFormDrawer from "../../components/FormDrawer/CategoryFormDrawer";

const CategoryPage = () => {
  const {
    categories,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,
    selectedCategory,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleDrawerSubmit,
  } = CategoryHook();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card px-6 py-5 rounded-2xl border border-border shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <FolderTree size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Danh mục món
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Phân loại thực đơn để khách hàng dễ tìm kiếm.
            </p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:bg-primary-light transition-colors text-sm font-semibold shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <PlusCircle size={18} strokeWidth={2.5} />
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
        </Table>
      </div>

      {/* Component Drawer - Trượt từ phải ra */}
      <CategoryFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        initialData={selectedCategory}
        categories={categories} // Truyền danh sách categories để gán cho Dropdown chọn cha
        onSubmit={handleDrawerSubmit}
      />
    </div>
  );
};

export default CategoryPage;
