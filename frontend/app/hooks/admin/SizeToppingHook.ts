"use client";

import { useSizeStore } from "@/app/store/admin/useSizeStore";
import { useToppingStore } from "@/app/store/admin/useToppingStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const SizeToppingHook = () => {
  const {
    sizes,
    selectedSize,
    loading: loadingSize,
    setSelectedSize,
    fetchSizes,
    createSize,
    updateSize,
    deleteSize,
    toggleSizeStatus,
    restoreSize,
  } = useSizeStore();
  const {
    toppings,
    selectedTopping,
    loading: loadingTopping,
    setSelectedTopping,
    fetchToppings,
    createTopping,
    updateTopping,
    toggleToppingStatus,
    deleteTopping,
    restoreTopping,
  } = useToppingStore();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [typeDrawer, setTypeDrawer] = useState<"size" | "topping">("size");

  // ----------------------------------------------------------
  // Handlers chung cho cả Size & Topping
  // ----------------------------------------------------------
  const handleOpenCreate = (type: "size" | "topping") => {
    setDrawerMode("create");
    setTypeDrawer(type);
    // Xóa selection cũ khi tạo mới
    setSelectedSize(null);
    setSelectedTopping(null);
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleOpenEdit = (
    type: "size" | "topping",
    item: { id: number | string; name: string; price?: number },
  ) => {
    setDrawerMode("edit");
    setTypeDrawer(type);
    if (type === "size") {
      setSelectedSize(item as any);
    } else {
      setSelectedTopping(item as any);
    }
    setIsOpenDrawer(true);
  };

  // -----------------------------------------------------------
  // Handlers riêng cho Size
  // -----------------------------------------------------------
  const handleDrawerSubmitSize = async (data: {
    name: string;
    price?: number;
  }) => {
    try {
      if (drawerMode === "create") {
        await createSize(data);
        toast.success("Tạo kích cỡ thành công!");
      } else if (drawerMode === "edit" && selectedSize) {
        await updateSize(selectedSize.id, data);
        toast.success("Cập nhật kích cỡ thành công!");
      }
      setIsOpenDrawer(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleDeleteSize = async (id: number | string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa kích cỡ này?")) return; // Bấm hủy thì dừng luôn

    try {
      await deleteSize(id);
      toast.success("Xóa kích cỡ thành công!");
    } catch (error) {
      toast.error("Kích cỡ đang được sử dụng trong sản phẩm, không thể xóa!");
    }
  };

  const handleToggleSizeStatus = async (id: number | string) => {
    try {
      await toggleSizeStatus(id);
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handleRestoreSize = async (id: number | string) => {
    try {
      await restoreSize(id);
      toast.success("Khôi phục kích cỡ thành công!");
    } catch (error) {
      toast.error("Lỗi khi khôi phục!");
    }
  };

  // -----------------------------------------------------------
  // Handlers riêng cho Topping
  // -----------------------------------------------------------

  const handleDrawerSubmitTopping = async (data: {
    name: string;
    price?: number;
  }) => {
    try {
      const payload = { name: data.name, price: data.price ?? 0 };
      if (drawerMode === "create") {
        await createTopping(payload);
        toast.success("Tạo topping thành công!");
      } else if (drawerMode === "edit" && selectedTopping) {
        await updateTopping(selectedTopping.id, payload);
        toast.success("Cập nhật topping thành công!");
      }
      setIsOpenDrawer(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleDeleteTopping = async (id: number | string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa topping này?")) return; // Bấm hủy thì dừng luôn

    try {
      await deleteTopping(id);
      toast.success("Xóa topping thành công!");
    } catch (error) {
      toast.error("Topping đang được sử dụng trong sản phẩm, không thể xóa!");
    }
  };

  const handleToggleToppingStatus = async (id: number | string) => {
    try {
      await toggleToppingStatus(id);
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handleRestoreTopping = async (id: number | string) => {
    try {
      await restoreTopping(id);
      toast.success("Khôi phục topping thành công!");
    } catch (error) {
      toast.error("Lỗi khi khôi phục!");
    }
  };

  useEffect(() => {
    fetchSizes();
    fetchToppings();
  }, []);

  return {
    sizes,
    fetchSizes,
    selectedSize,

    toppings,
    fetchToppings,
    selectedTopping,
    isOpenDrawer,
    setIsOpenDrawer,
    drawerMode,
    typeDrawer,

    loading: loadingSize || loadingTopping,

    handleOpenCreate,
    handleOpenEdit,
    handleCloseDrawer,

    handleDrawerSubmitSize,
    handleDeleteSize,
    handleToggleSizeStatus,
    handleRestoreSize,

    handleDrawerSubmitTopping,
    handleDeleteTopping,
    handleToggleToppingStatus,
    handleRestoreTopping,
  };
};
