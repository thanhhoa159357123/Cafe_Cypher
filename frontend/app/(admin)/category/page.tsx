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
import { PlusCircle, Edit, Trash2, FolderTree } from "lucide-react";

const CategoryPage = () => {
  // Dữ liệu giả lập Danh mục
  const categories = [
    {
      id: "DM001",
      name: "Cafe Truyền Thống",
      description: "Các loại cafe pha phin, pha máy cơ bản",
      count: 12,
      status: "Hoạt động",
    },
    {
      id: "DM002",
      name: "Trà Trái Cây",
      description: "Trà ủ lạnh kết hợp trái cây tươi",
      count: 8,
      status: "Hoạt động",
    },
    {
      id: "DM003",
      name: "Đá Xay (Ice Blended)",
      description: "Thức uống đá xay kèm whipping cream",
      count: 5,
      status: "Đang ẩn",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <FolderTree size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Danh mục món
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Phân loại thực đơn để khách hàng dễ tìm kiếm.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
          <PlusCircle size={18} />
          Thêm danh mục
        </button>
      </div>

      {/* CONTENT: Bảng */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách phân loại nhóm món ăn và thức uống.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-slate-700">
                Mã DM
              </TableHead>
              <TableHead className="font-bold text-slate-700 w-[250px]">
                Tên danh mục
              </TableHead>
              <TableHead className="font-bold text-slate-700">Mô tả</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">
                Số món
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
            {categories.map((category) => (
              <TableRow
                key={category.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-500">
                  {category.id}
                </TableCell>
                <TableCell className="font-black text-slate-900">
                  {category.name}
                </TableCell>
                <TableCell className="text-slate-500 italic text-sm">
                  {category.description}
                </TableCell>
                <TableCell className="text-center font-bold text-slate-700">
                  {category.count}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      category.status === "Hoạt động"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {category.status}
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

export default CategoryPage;
