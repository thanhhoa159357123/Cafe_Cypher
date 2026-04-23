"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Edit,
  Trash2,
  Users,
  ShieldCheck,
  User,
  RefreshCw,
} from "lucide-react";
import { UserHook } from "@/app/hooks/admin/UserHook";
import { Switch } from "@/components/ui/switch";
import UserFormDrawer from "./FormDrawer/UserFormDrawer";

interface UserPageProps {
  typeRole: "client" | "staff";
}

const UserPage = ({ typeRole }: UserPageProps) => {
  const {
    users,
    loading,
    fetchUsers,
    selectedUser,
    isActionLoading,
    handleViewUserDetails,
    handleCloseDetails,
    handleToggleStatus,
    handleDeleteUser,
    handleRestoreUser,
  } = UserHook();
  console.log("us", users);

  useEffect(() => {
    fetchUsers(typeRole);
  }, [typeRole]);

  const pageTitle =
    typeRole === "client" ? "Quản lý khách hàng" : "Quản lý nhân viên";
  const pageDesc =
    typeRole === "client"
      ? "Danh sách khách hàng thành viên của hệ thống."
      : "Danh sách nhân sự quản trị và vận hành.";

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-card-foreground">
              {pageTitle}
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              {pageDesc}
            </p>
          </div>
        </div>
        {typeRole === "staff" && (
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all text-sm font-bold shadow-md hover:shadow-lg cursor-pointer">
            <PlusCircle size={18} />
            Thêm nhân viên
          </button>
        )}
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4 text-muted-foreground">
            Danh sách tài khoản và phân quyền trên hệ thống.
          </TableCaption>
          <TableHeader className="bg-muted/30 border-b border-border">
            <TableRow>
              <TableHead className="w-25 font-bold text-card-foreground">
                Mã KH
              </TableHead>
              <TableHead className="font-bold text-card-foreground w-50">
                Họ và tên
              </TableHead>
              <TableHead className="font-bold text-card-foreground">
                Số điện thoại
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-center">
                Vai trò
              </TableHead>
              <TableHead className="font-bold text-card-foreground text-center">
                Số lượng đơn hàng
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/20 transition-colors group"
              >
                <TableCell className="font-semibold text-muted-foreground">
                  {user.id}
                </TableCell>
                <TableCell className="font-black text-card-foreground flex items-center gap-2">
                  {user.role === "Admin" && (
                    <ShieldCheck size={16} className="text-primary" />
                  )}
                  {user.last_name} {user.first_name}
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">
                  {user.email}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      user.role === "Admin"
                        ? "bg-primary/10 text-primary"
                        : user.role === "Nhân viên"
                          ? "bg-secondary/20 text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-medium text-card-foreground">
                    {user.orders_count}
                  </span>
                </TableCell>
                <TableCell className="w-36">
                  <div className="flex items-center gap-2">
                    <Switch
                      disabled={!!user.deleted_at}
                      checked={user.status === "active"}
                      onCheckedChange={() => handleToggleStatus(user.id)}
                      className="data-[state=checked]:bg-primary cursor-pointer"
                    />
                    <span
                      className={`text-[11px] font-semibold whitespace-nowrap ${
                        user.deleted_at
                          ? "text-red-500"
                          : user.status === "active"
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {user.deleted_at
                        ? "Đã xóa"
                        : user.status === "active"
                          ? "Đang hoạt động"
                          : "Tạm ẩn"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleViewUserDetails(user.id)}
                      title="Xem chi tiết"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-1.5 rounded-md transition-all cursor-pointer"
                    >
                      <Edit size={18} />
                    </button>
                    {!user.deleted_at ? (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Xóa tài khoản"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-all cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRestoreUser(user.id)}
                        title="Khôi phục tài khoản"
                        className="text-green-600 hover:text-green-700 hover:bg-green-100 p-1.5 rounded-md transition-all cursor-pointer"
                      >
                        <RefreshCw size={18} />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UserFormDrawer
        isOpen={!!selectedUser}
        onClose={handleCloseDetails}
        user={selectedUser}
      />
    </div>
  );
};

export default UserPage;
