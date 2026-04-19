"use client";

import { IProduct } from "@/app/types/base/product";
import { Switch } from "@/components/ui/switch";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import React from "react";

interface ProductRowProps {
  products: IProduct[]; // Thay 'IProduct' IProduct kiểu dữ liệu thực tế của sản phẩm (ví dụ: IProduct[])
  handleToggleStatus: (id: number | string) => void; // Hàm toggle trạng thái sản phẩm
  handleOpenEdit: (product: IProduct) => void; // Thay 'any' bằng kiểu dữ liệu thực tế của sản phẩm
  handleDrawerDelete: (id: number | string) => void;
  handleRestore?: (id: number | string) => void;
}

// Hàm format tiền tệ VNĐ
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const ProductRow = ({
  products,
  handleToggleStatus,
  handleOpenEdit,
  handleDrawerDelete,
  handleRestore,
}: ProductRowProps) => {
  return (
    <TableBody className="divide-y divide-border">
      {products.map((product) => (
        <TableRow
          key={product.id}
          className="hover:bg-muted/40 transition-colors group"
        >
          {/* ID */}
          <TableCell className="font-mono text-xs font-semibold text-muted-foreground text-center">
            #{product.id}
          </TableCell>

          {/* Hình ảnh */}
          <TableCell>
            <div className="w-12 h-12 rounded-xl border border-border overflow-hidden bg-secondary shadow-sm">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                loading="lazy"
              />
            </div>
          </TableCell>

          {/* Thông tin SP */}
          <TableCell>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-foreground text-base">
                {product.name}
              </span>
              {/* Bỏ w-64, thêm w-full. Sửa wrap-break-word tành break-words */}
              <span className="text-xs font-medium text-muted-foreground w-full whitespace-normal wrap-break-word leading-relaxed">
                {product.description || "Chưa có mô tả..."}
              </span>
            </div>
          </TableCell>

          {/* Danh mục */}
          <TableCell>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary text-secondary-foreground">
              {product.category?.name || "Chưa phân loại"}
            </span>
          </TableCell>

          {/* Tùy chọn (Toppings / Sizes) */}
          <TableCell>
            <div className="flex flex-wrap gap-1.5">
              {/* Size Badge */}
              {product.sizes?.length > 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground border border-border">
                  {product.sizes.length} Cỡ
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted/50 text-muted-foreground border border-border/50">
                  Size chung
                </span>
              )}

              {/* Topping Badge */}
              {product.toppings?.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent/20 text-accent-foreground border border-accent/20">
                  + {product.toppings.length} Toppings
                </span>
              )}
            </div>
          </TableCell>

          {/* Giá tiền */}
          <TableCell className="text-right">
            <span className="font-semibold text-foreground text-base">
              {formatPrice(product.price)}
            </span>
          </TableCell>

          {/* Cột Trạng thái (Trước cột Action) */}
          <TableCell>
            <div className="flex items-center gap-2">
              <Switch
                checked={product.status === "active"}
                disabled={!!product.deleted_at}
                onCheckedChange={() => handleToggleStatus(product.id)}
              />
              <span
                className={`text-[11px] font-bold uppercase ${
                  product.deleted_at
                    ? "text-red-500"
                    : product.status === "active"
                      ? "text-green-600"
                      : "text-muted-foreground"
                }`}
              >
                {product.deleted_at
                  ? "Đã xóa"
                  : product.status === "active"
                    ? "Đang bán"
                    : "Tạm ẩn"}
              </span>
            </div>
          </TableCell>

          {/* Nút hành động */}
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <button
                title="Chỉnh sửa"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors cursor-pointer"
                onClick={() => handleOpenEdit(product)}
              >
                <Edit size={18} strokeWidth={2} />
              </button>

              {!product.deleted_at ? (
                <button
                  title="Xóa sản phẩm"
                  onClick={() => handleDrawerDelete(product.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              ) : (
                handleRestore && (
                  <button
                    title="Khôi phục"
                    onClick={() => handleRestore(product.id)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw size={18} strokeWidth={2} />
                  </button>
                )
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ProductRow;
