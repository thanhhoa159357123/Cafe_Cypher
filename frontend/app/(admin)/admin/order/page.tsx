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
import { ShoppingCart, Eye, FileDown, CheckCircle } from "lucide-react";

const OrderPage = () => {
  // Dữ liệu giả lập Đơn hàng
  const orders = [
    {
      id: "ORD-1001",
      customer: "Nguyễn Văn A",
      items: "2x Cafe Muối",
      total: "70.000đ",
      time: "10:30 - Hôm nay",
      status: "Hoàn thành",
    },
    {
      id: "ORD-1002",
      customer: "Khách vãng lai",
      items: "1x Bạc Xỉu, 1x Bánh Mì",
      total: "65.000đ",
      time: "11:15 - Hôm nay",
      status: "Đang pha chế",
    },
    {
      id: "ORD-1003",
      customer: "Chị Lan (Bàn 5)",
      items: "3x Trà Đào Cam Sả...",
      total: "155.000đ",
      time: "11:45 - Hôm nay",
      status: "Chờ xác nhận",
    },
    {
      id: "ORD-1004",
      customer: "Lê Tuấn (Mang về)",
      items: "1x Espresso",
      total: "35.000đ",
      time: "12:00 - Hôm nay",
      status: "Đã hủy",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Quản lý Đơn hàng
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Theo dõi doanh thu và trạng thái phục vụ khách hàng.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Nút xuất file Excel/PDF cho Admin xem báo cáo */}
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
            <FileDown size={18} />
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
            <CheckCircle size={18} />
            Tạo đơn thủ công
          </button>
        </div>
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách đơn hàng phát sinh trên hệ thống.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-[120px] font-bold text-slate-700">
                Mã Đơn
              </TableHead>
              <TableHead className="font-bold text-slate-700 w-[200px]">
                Khách hàng
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Món ăn/Thức uống
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Thời gian
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                Tổng tiền
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Trạng thái
              </TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-[100px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-bold text-slate-700">
                  {order.id}
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  {order.customer}
                </TableCell>
                <TableCell className="text-slate-500 italic text-sm">
                  {order.items}
                </TableCell>
                <TableCell className="text-slate-600 font-medium text-sm">
                  {order.time}
                </TableCell>
                <TableCell className="text-right font-black text-slate-900">
                  {order.total}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      order.status === "Chờ xác nhận"
                        ? "bg-amber-100 text-amber-700"
                        : order.status === "Đang pha chế"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Hoàn thành"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    {/* Đơn hàng thường Admin chỉ xem chi tiết, ít khi xóa thẳng tay */}
                    <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all text-xs font-bold">
                      <Eye size={16} /> Xem
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

export default OrderPage;
