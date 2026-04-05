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
import { PlusCircle, Edit, Trash2, Layers } from "lucide-react";

const ToppingAndSizePage = () => {
  // Dữ liệu giả lập kết hợp Size và Topping
  const options = [
    {
      id: "OPT01",
      name: "Size L (Lớn)",
      type: "Kích cỡ",
      extraPrice: "+ 10.000đ",
      status: "Đang áp dụng",
    },
    {
      id: "OPT02",
      name: "Size M (Vừa)",
      type: "Kích cỡ",
      extraPrice: "+ 0đ",
      status: "Đang áp dụng",
    },
    {
      id: "OPT03",
      name: "Trân châu trắng",
      type: "Topping",
      extraPrice: "+ 8.000đ",
      status: "Đang áp dụng",
    },
    {
      id: "OPT04",
      name: "Kem Macchiato",
      type: "Topping",
      extraPrice: "+ 12.000đ",
      status: "Hết nguyên liệu",
    },
    {
      id: "OPT05",
      name: "Thạch Đào",
      type: "Topping",
      extraPrice: "+ 10.000đ",
      status: "Đang áp dụng",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Topping & Kích Cỡ
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Quản lý các lựa chọn cộng thêm giá cho thức uống.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
          <PlusCircle size={18} />
          Thêm tùy chọn
        </button>
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách kích cỡ và topping kèm giá cộng thêm.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-slate-700">
                Mã
              </TableHead>
              <TableHead className="font-bold text-slate-700 w-[250px]">
                Tên tùy chọn
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Phân loại
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                Phụ thu
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
            {options.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-500">
                  {item.id}
                </TableCell>
                <TableCell className="font-black text-slate-900">
                  {item.name}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.type === "Kích cỡ"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </TableCell>
                <TableCell className="text-right font-black text-slate-900">
                  {item.extraPrice}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      item.status === "Đang áp dụng"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
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

export default ToppingAndSizePage;
