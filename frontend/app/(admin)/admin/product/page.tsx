// frontend/app/(admin)/admin/product/page.tsx
"use client";

import React, { useState } from "react";
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
  Coffee,
  FilterX,
  Search,
} from "lucide-react";
import { ProductHook } from "@/app/hooks/admin/ProductHook";
import ProductFormDrawer from "../../components/FormDrawer/Product/ProductFormDrawer";
import { SizeToppingHook } from "@/app/hooks/admin/SizeToppingHook";
import { useCategoryStore } from "@/app/store/admin/useCategoryStore";
import TitleHeader from "./items/TitleHeader";
import ButtonPagination from "../../components/ButtonPagination";
import ProductBody from "./items/ProductBody";
import FilterProduct from "./items/FilterProduct";

const ProductPage = () => {
  const {
    products,
    meta,
    loading,
    currentPage,
    handlePageChange,
    isDrawerOpen,
    setIsDrawerOpen,
    handleToggleStatus,
    handleRestoreProduct,
    drawerMode,
    selectedProduct,
    handleOpenCreate,
    handleOpenEdit,
    handleDrawerSubmit,
    handleDrawerDelete,

    handleFilter,
    handleResetFilter,
  } = ProductHook();
  const { sizes, toppings } = SizeToppingHook();
  const { categories } = useCategoryStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // 3. Hàm gọi khi bấm nút Lọc
  const onApplyFilter = () => {
    handleFilter({
      search: search,
      status: status,
      category_id: categoryId,
    });
  };

  // 4. Hàm gọi khi bấm Xóa Lọc
  const onClearFilter = () => {
    setSearch("");
    setStatus("");
    setCategoryId("");
    handleResetFilter();
  };
  return (
    <div className="space-y-6">
      {/* Header & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card px-6 py-5 rounded-2xl border border-border shadow-sm gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-card-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Coffee size={24} strokeWidth={2} />
            </div>
            Danh sách thực đơn
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Quản lý{" "}
            <span className="font-semibold text-card-foreground">
              {meta?.total || products?.length || 0}
            </span>{" "}
            món nước, giá bán và tùy chọn.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm font-semibold shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          onClick={handleOpenCreate}
        >
          <PlusCircle size={18} strokeWidth={2} />
          Thêm món mới
        </button>
      </div>

      <FilterProduct
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        onApplyFilter={onApplyFilter}
        onClearFilter={onClearFilter}
      />

      {/* Bảng hiển thị dữ liệu */}
      <div
        className={`bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="mb-4 text-muted-foreground">
              Danh sách các sản phẩm đang được phục vụ
            </TableCaption>
            <TitleHeader />
            <ProductBody
              products={products}
              handleToggleStatus={handleToggleStatus}
              handleOpenEdit={handleOpenEdit}
              handleDrawerDelete={handleDrawerDelete}
            />
          </Table>
        </div>
      </div>

      {/* Phân trang */}
      {meta && meta.last_page > 1 && (
        <ButtonPagination
          meta={meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <ProductFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        initialData={selectedProduct}
        onSubmit={handleDrawerSubmit}
        onDelete={handleDrawerDelete}
        onRestore={handleRestoreProduct}
        availableSizes={sizes}
        availableToppings={toppings}
        availableCategories={categories}
      />
    </div>
  );
};

export default ProductPage;
