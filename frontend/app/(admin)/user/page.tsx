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
import { PlusCircle, Edit, Trash2, Users, ShieldCheck } from "lucide-react";

const UserPage = () => {
  // Dữ liệu giả lập Người dùng (Gồm cả Khách hàng và Nhân viên)
  const users = [
    {
      id: "USR001",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      role: "Khách hàng",
      point: 150,
      status: "Hoạt động",
    },
    {
      id: "USR002",
      name: "Trần Thị Lan (Barista)",
      phone: "0987654321",
      role: "Nhân viên",
      point: 0,
      status: "Hoạt động",
    },
    {
      id: "USR003",
      name: "Lê Minh Tuấn",
      phone: "0911222333",
      role: "Khách hàng",
      point: 45,
      status: "Hoạt động",
    },
    {
      id: "USR004",
      name: "Bác Hòa (Sếp)",
      phone: "0999888777",
      role: "Admin",
      point: 9999,
      status: "Hoạt động",
    },
    {
      id: "USR005",
      name: "Spam User",
      phone: "0123456789",
      role: "Khách hàng",
      point: 0,
      status: "Bị khóa",
    },
  ];

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
              Quản lý tài khoản
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Danh sách khách hàng thành viên và nhân viên hệ thống.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
          <PlusCircle size={18} />
          Thêm tài khoản
        </button>
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách tài khoản và phân quyền trên hệ thống.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-slate-700">
                Mã KH
              </TableHead>
              <TableHead className="font-bold text-slate-700 w-[200px]">
                Họ và tên
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Số điện thoại
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Vai trò
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Điểm tích lũy
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-[120px]">
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
                  {user.name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {user.phone}
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
                <TableCell className="text-center font-bold text-amber-500">
                  {user.point > 0 ? `${user.point} pt` : "-"}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.status === "Hoạt động"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-md transition-all">
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
    </div>
  );
};

export default UserPage;
