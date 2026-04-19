// frontend/app/hooks/admin/UserHook.ts

"use client";

import { useUserStore } from "@/app/store/admin/useUserStore";
import { useState } from "react";
import { toast } from "sonner";

export const UserHook = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    toggleUserStatus,
    deleteUser,
    restoreUser,
  } = useUserStore();

  // Khai báo state phục vụ riêng cho FormDrawer
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Hàm xử lý khi bấm nút "Xem chi tiết"
  const handleViewUserDetails = async (userId: number) => {
    setIsActionLoading(true);
    try {
      const userDetails = await fetchUserById(userId);
      if (userDetails) {
        setSelectedUser(userDetails);
      } else {
        toast.error("Không tìm thấy thông tin người dùng!");
      }
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết User ${userId}:`, error);
      toast.error("Không thể lấy chi tiết người dùng");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Hàm xử lý đóng Drawer
  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  const handleToggleStatus = async (id: number | string) => {
    try {
      await toggleUserStatus(id);
      toast.success("Cập nhật trạng thái người dùng thành công");
    } catch (e) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  const handleDeleteUser = async (id: number | string) => {
    if (
      !confirm(
        "Bạn có chắc chắn muốn xóa hệ thống người dùng này? (Người dùng sẽ không thể đăng nhập, nhưng vẫn xem được trong admin)",
      )
    )
      return;
    try {
      await deleteUser(id);
      toast.success("Đã xóa (vô hiệu hóa) người dùng thành công");
    } catch (e) {
      toast.error("Lỗi khi xóa người dùng");
    }
  };

  const handleRestoreUser = async (id: number | string) => {
    if (!confirm("Bạn có muốn khôi phục lại người dùng này?")) return;
    try {
      await restoreUser(id);
      toast.success("Khôi phục người dùng thành công");
    } catch (e) {
      toast.error("Lỗi khi khôi phục người dùng");
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,

    // Xuất các state & hàm mới ra cho Giao diện xài
    selectedUser,
    isActionLoading,
    handleViewUserDetails,
    handleCloseDetails,
    handleToggleStatus,
    handleDeleteUser,
    handleRestoreUser,
  };
};
