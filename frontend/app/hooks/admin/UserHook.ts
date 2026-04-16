// frontend/app/hooks/admin/UserHook.ts

"use client";

import { useUserStore } from "@/app/store/admin/useUserStore";
import { useState } from "react";
import { toast } from "sonner";

export const UserHook = () => {
  const { users, loading, error, fetchUsers, fetchUserById } = useUserStore();

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
  };
};
