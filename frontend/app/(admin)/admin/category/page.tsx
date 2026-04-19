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
import CategoryBody from "./items/CategoryBody";
import TitleHeader from "./items/TitleHeader";

const CategoryPage = () => {
  const {
    categories,
    loading,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,
    selectedCategory,
    handleOpenCreate,
    handleOpenEdit,
    handleDelete,
    handleDrawerSubmit,
    handleRestoreCategory,
    handleToggleStatus,
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
      <div
        className={`bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Table>
          <TableCaption className="mb-4 text-muted-foreground">
            Danh sách phân loại nhóm món ăn và thức uống.
          </TableCaption>
          <TitleHeader />
          <CategoryBody
            categories={categories}
            handleOpenEdit={handleOpenEdit}
            handleDelete={handleDelete}
            handleToggleStatus={handleToggleStatus}
            handleRestore={handleRestoreCategory}
          />
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
