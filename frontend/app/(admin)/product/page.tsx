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
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const ProductPage = () => {
  // Dữ liệu giả lập (Sau này bác fetch API từ Laravel rồi ném mảng đó vào đây)
  const products = [
    {
      id: "SP001",
      name: "Cafe Muối",
      category: "Cafe Phin",
      price: "35.000đ",
      status: "Còn hàng",
    },
    {
      id: "SP002",
      name: "Bạc Xỉu Bọt Biển",
      category: "Cafe Phin",
      price: "39.000đ",
      status: "Còn hàng",
    },
    {
      id: "SP003",
      name: "Trà Đào Cam Sả",
      category: "Trà Trái Cây",
      price: "45.000đ",
      status: "Hết hàng",
    },
    {
      id: "SP004",
      name: "Matcha Đá Xay",
      category: "Đá Xay",
      price: "55.000đ",
      status: "Còn hàng",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TOP: Header & Nút thêm mới */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Danh sách sản phẩm
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Quản lý thực đơn, giá bán và tình trạng kho.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold shadow-md hover:shadow-lg">
          <PlusCircle size={18} />
          Thêm món mới
        </button>
      </div>

      {/* CONTENT: Bảng hiển thị dữ liệu Shadcn */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="mb-4">
            Danh sách thực đơn hiện tại của Cypher Cafe.
          </TableCaption>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-slate-700">
                Mã SP
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Tên món
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Danh mục
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                Giá bán
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
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-500">
                  {product.id}
                </TableCell>
                <TableCell className="font-black text-slate-900">
                  {product.name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {product.category}
                </TableCell>
                <TableCell className="text-right font-black text-slate-900">
                  {product.price}
                </TableCell>
                <TableCell className="text-center">
                  {/* Badge tự chế bằng Tailwind cho nhanh gọn */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      product.status === "Còn hàng"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
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

export default ProductPage;
