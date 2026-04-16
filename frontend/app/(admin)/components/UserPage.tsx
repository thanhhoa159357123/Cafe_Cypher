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
  } = UserHook();

  // 3. Truyền thẳng typeRole dạng chuỗi ("customer" hoặc "staff") vào hàm fetch
  useEffect(() => {
    fetchUsers(typeRole);
  }, [typeRole]);

  // Đổi title linh hoạt theo role luôn cho xịn
  const pageTitle =
    typeRole === "client" ? "Quản lý khách hàng" : "Quản lý nhân viên";
  const pageDesc =
    typeRole === "client"
      ? "Danh sách khách hàng thành viên của hệ thống."
      : "Danh sách nhân sự quản trị và vận hành.";

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {pageTitle}
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {pageDesc}
            </p>
          </div>
        </div>
        {typeRole === "staff" && (
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
            <PlusCircle size={18} />
            Thêm nhân viên
          </button>
        )}
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách tài khoản và phân quyền trên hệ thống.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-25 font-bold text-slate-700">
                Mã KH
              </TableHead>
              <TableHead className="font-bold text-slate-700 w-50">
                Họ và tên
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Số điện thoại
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Vai trò
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Số lượng đơn hàng
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-30">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-500">
                  {user.id}
                </TableCell>
                <TableCell className="font-black text-slate-900 flex items-center gap-2">
                  {user.role === "Admin" && (
                    <ShieldCheck size={16} className="text-purple-600" />
                  )}
                  {user.last_name} {user.first_name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {user.email}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "Nhân viên"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-medium text-slate-700">
                    {user.orders_count}
                  </span>
                </TableCell>
                <TableCell className="w-36">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.status === "active"}
                      className="data-[state=checked]:bg-primary"
                    />
                    <span
                      className={`text-[11px] font-semibold whitespace-nowrap ${
                        user.status === "active"
                          ? "text-emerald-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {user.status === "active" ? "Đang hoạt động" : "Tạm ẩn"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleViewUserDetails(user.id)}
                      title="Xem chi tiết"
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-md transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-all">
                      <Trash2 size={18} />
                    </button>
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
