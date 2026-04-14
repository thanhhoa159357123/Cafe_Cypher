"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "../../store/admin/useProductStore";
import { IProduct } from "@/app/types/base/product";
import { toast } from "sonner";
import { restoreProduct } from "@/app/services/admin/productService";

export const ProductHook = () => {
  const {
    products,
    meta,
    loading,
    error,
    fetchProducts,
    selectedProduct,
    setSelectedProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
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

  const handleToggleStatus = async (id: number | string) => {
    await toggleProductStatus(id);
    toast.success("Trạng thái sản phẩm đã được cập nhật!");
  };

  const handleRestoreProduct = async (id: number | string) => {
    await restoreProduct(id);
    toast.success("Sản phẩm đã được khôi phục!");

    // setIsDrawerOpen(false);
    await fetchProducts(currentPage);
  };

  // Hàm Submit (Gọi API tạo mới hoặc update)
  const handleDrawerSubmit = async (data: any) => {
    try {
      console.log("1. [Hook] Chế độ hiện tại:", drawerMode);
      console.log("2. [Hook] Payload từ Form gửi lên:", data);

      if (!data) throw new Error("Dữ liệu đầu vào bị trống");

      // Cẩn thận map lại sizes và toppings
      const sizes = Array.isArray(data.sizes)
        ? data.sizes.map((size: any) => ({
            id: size.id,
            name: size.name,
            price: Number(size.price) || 0,
          }))
        : [];

      const toppings = Array.isArray(data.toppings)
        ? data.toppings.map((topping: any) => topping.id)
        : [];

      // Dữ liệu dùng chung cho cả Create và Edit
      const formattedProduct = {
        id: data.id ?? 0,
        name: data.name,
        description: data.description || "",
        price: Number(data.price) || 0,
        image: data.image || "",
        // Xử lý lấy chuẩn category_id (từ form truyền lên hoặc object category)
        category_id: data.category_id || data.category?.id || null,
        sizes: sizes,
        toppings: toppings,
      };

      console.log("3. [Hook] Dữ liệu sau khi format chuẩn:", formattedProduct);

      if (drawerMode === "create") {
        console.log("4. Đang gọi API: createProduct...");
        await createProduct(formattedProduct as any);
        toast.success("Sản phẩm mới đã được tạo thành công!");
        setIsDrawerOpen(false);
      } else {
        console.log(
          "4. Đang gọi API: updateProduct cho ID:",
          selectedProduct?.id,
        );

        // Gọi hàm update do store cung cấp
        await updateProduct(selectedProduct?.id || "", formattedProduct as any);
        toast.success("Sản phẩm đã được cập nhật thành công!");
        setIsDrawerOpen(false);
      }

      // Xong thì gọi refresh bảng
      await fetchProducts(currentPage);
    } catch (error: any) {
      // Bắt các lỗi ngầm, log đỏ ra console và hiển thị Toast cho người dùng
      console.error("❌ Lỗi trong lúc xử lý Submit:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không thể lưu sản phẩm vì có lỗi hệ thống";

      toast.error(errorMessage);

      // Gây lỗi lên báo cho func gọi handleDrawerSubmit biết là form đã lỗi
      throw error;
    }
  };

  // Hàm Xóa (Gọi API xóa)
  const handleDrawerDelete = async (id: number | string) => {
    await deleteProduct(id);
    toast.success("Sản phẩm đã được xóa thành công!");

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
    handleToggleStatus,
    handleRestoreProduct,
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
