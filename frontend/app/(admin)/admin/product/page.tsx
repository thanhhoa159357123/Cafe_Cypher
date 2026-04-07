// frontend/app/(admin)/admin/product/page.tsx
"use client";

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
import { PlusCircle, Edit, Trash2, Coffee } from "lucide-react";
import { ProductHook } from "@/app/hooks/admin/ProductHook";
import ProductFormDrawer from "../../components/ProductFormDrawer";

// Hàm format tiền tệ VNĐ
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const ProductPage = () => {
  const {
    products,
    meta,
    loading,
    currentPage,
    handlePageChange,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,
    selectedProduct,
    handleOpenCreate,
    handleOpenEdit,
    handleDrawerSubmit,
    handleDrawerDelete,
  } = ProductHook();

  return (
    <div className="space-y-6">
      {/* Header & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card px-6 py-5 rounded-2xl border border-border shadow-sm gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/15 text-primary rounded-xl">
              <Coffee size={24} strokeWidth={2.5} />
            </div>
            Danh sách thực đơn
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Quản lý{" "}
            <span className="font-semibold text-foreground">
              {meta?.total || products?.length || 0}
            </span>{" "}
            món nước, giá bán và tùy chọn.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:bg-primary-light transition-colors text-sm font-semibold shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          onClick={handleOpenCreate}
        >
          <PlusCircle size={18} strokeWidth={2.5} />
          Thêm món mới
        </button>
      </div>

      {/* Bảng hiển thị dữ liệu */}
      <div
        className={`bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="overflow-x-auto">
          <Table className="table-fixed min-w-250 w-full">
            <TableCaption className="mb-4 text-muted-foreground">
              Danh sách các sản phẩm đang được phục vụ
            </TableCaption>
            <TableHeader className="bg-secondary/30 border-b border-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-15 font-semibold text-foreground text-center">
                  ID
                </TableHead>
                <TableHead className="w-20 font-semibold text-foreground">
                  Ảnh
                </TableHead>
                {/* Cho cột sản phẩm chiếm phần lớn chỗ còn lại */}
                <TableHead className="w-auto font-semibold text-foreground">
                  Sản phẩm
                </TableHead>
                <TableHead className="w-35 font-semibold text-foreground">
                  Phân loại
                </TableHead>
                <TableHead className="w-40 font-semibold text-foreground">
                  Tùy chọn
                </TableHead>
                <TableHead className="w-30 font-semibold text-foreground text-right">
                  Giá bán
                </TableHead>
                <TableHead className="w-35 text-right font-semibold text-foreground">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
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
                      {product.category?.category_name || "Chưa phân loại"}
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

                  {/* Nút hành động */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Chỉnh sửa"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors cursor-pointer"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <Edit size={18} strokeWidth={2} />
                      </button>
                      <button
                        title="Xóa sản phẩm"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* THÊM KHU VỰC PHÂN TRANG VÀO DƯỚI BẢNG */}
      {meta && meta.last_page > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 bg-card border border-border shadow-sm rounded-2xl gap-4">
          <span className="text-sm text-muted-foreground font-medium">
            Trang{" "}
            <span className="font-bold text-foreground">
              {meta.current_page}
            </span>{" "}
            trên tổng số{" "}
            <span className="font-bold text-foreground">{meta.last_page}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer active:scale-95"
            >
              Trước
            </button>

            {/* Khối hiển thị trang hiện tại */}
            <div className="min-w-10 text-center py-2 bg-primary/15 text-primary rounded-xl text-sm font-bold border border-primary/20 shadow-sm">
              {currentPage}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.last_page || loading}
              className="px-4 py-2 border border-border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer active:scale-95"
            >
              Sau
            </button>
          </div>
        </div>
      )}

      <ProductFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        initialData={selectedProduct}
        onSubmit={handleDrawerSubmit}
        onDelete={handleDrawerDelete}
      />
    </div>
  );
};

export default ProductPage;
