"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "../../store/admin/useProductStore";
import { IProduct } from "@/app/types/base/product";

export const ProductHook = () => {
  const {
    products,
    meta,
    loading,
    error,
    fetchProducts,
    selectedProduct,
    setSelectedProduct,
  } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Thêm 2 state vào export:
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");

  const handleOpenCreate = () => {
    setDrawerMode("create");
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (product: IProduct) => {
    setDrawerMode("edit");
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  // Hàm Submit (Gọi API tạo mới hoặc update)
  const handleDrawerSubmit = async (data: any) => {
    if (drawerMode === "create") {
      // Gọi API POST tạo mới...
    } else {
      // Gọi API PUT sửa...
    }
    await fetchProducts(currentPage); // Vừa sửa/tạo xong thì tải lại trang hiện tại để hứng data
  };

  // Hàm Xóa (Gọi API xóa)
  const handleDrawerDelete = async (id: number | string) => {
    // Kêu gọi báo warning (nếu muốn) trước khi Gọi API DELETE xóa ID...

    setIsDrawerOpen(false);
    await fetchProducts(currentPage);
  };

  // Lấy dữ liệu mỗi khi currentPage thay đổi
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    products,
    meta,
    loading,
    error,
    currentPage,
    handlePageChange,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,
    selectedProduct,
    handleOpenCreate,
    handleOpenEdit,
    handleDrawerSubmit,
    handleDrawerDelete,
  };
};
