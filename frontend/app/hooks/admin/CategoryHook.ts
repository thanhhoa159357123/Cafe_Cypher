"use client";

import { useState } from "react";
import { useCategoryStore } from "../../store/admin/useCategoryStore";
import { ICategory } from "@/app/types/base/category";
import { toast } from "sonner";

export const CategoryHook = () => {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    restoreCategory,

    loading,
    error,
    selectedCategory,
    setSelectedCategory,
  } = useCategoryStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedCategory(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (category: ICategory) => {
    setDrawerMode("edit");
    setSelectedCategory(category);
    setIsDrawerOpen(true);
  };

  // Hàm Submit (Gọi API tạo mới hoặc update)
  const handleDrawerSubmit = async (data: any) => {
    if (drawerMode === "create") {
      try {
        await createCategory({ name: data.name, parent_id: data.parent_id });
        toast.success("Danh mục mới đã được tạo thành công!");
        setIsDrawerOpen(false); // Đóng drawer khi thành công
      } catch (error: any) {
        toast.error(error.message); // Hiện câu cảnh báo "Tên danh mục đã tồn tại..."
      }
    } else {
      try {
        await updateCategory(selectedCategory?.id || "", {
          name: data.name,
          parent_id: data.parent_id,
        });
        toast.success("Danh mục đã được cập nhật thành công!");
        setIsDrawerOpen(false); // Đóng drawer khi thành công
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  // Hàm Xóa Mở ngoài Table
  const handleDelete = async (id: number | string) => {
    try {
      await deleteCategory(id);
      toast.success("Danh mục đã được xóa thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToggleStatus = async (id: number | string) => {
    await toggleCategoryStatus(id);
    toast.success("Trạng thái danh mục đã được cập nhật!");
  };

  const handleRestoreCategory = async (id: number | string) => {
    await restoreCategory(id);
    toast.success("Danh mục đã được khôi phục!");

    await fetchCategories();
  };

  return {
    categories,
    loading,
    error,

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
  };
};
