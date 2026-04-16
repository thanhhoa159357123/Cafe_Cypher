"use client";

import React, { useEffect, useState } from "react";
import { Table, TableCaption } from "@/components/ui/table";
import { ShoppingCart, FileDown, Filter, FilterX, Search } from "lucide-react";
import { OrderHook } from "@/app/hooks/admin/OrderHook";
import OrderFormDrawer from "../../components/FormDrawer/Order/OrderFormDrawer";
import Image from "next/image";
import TitleHeader from "./items/TitleHeader";
import OrderBody from "./items/OrderBody";
import ButtonPagination from "../../components/ButtonPagination";
import FilterOrder from "./items/FilterOrder";
import { useSearchParams } from "next/navigation";

// Hàm hỗ trợ dịch trạng thái tiếng Anh sang tiếng Việt và màu sắc Bootstrap
const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Chờ xác nhận",
      className: "bg-amber-100 text-amber-700",
    },
    processing: {
      label: "Đang pha chế",
      className: "bg-blue-100 text-blue-700",
    },
    shipping: {
      label: "Đang giao hàng",
      className: "bg-purple-100 text-purple-700",
    },
    completed: {
      label: "Hoàn thành",
      className: "bg-emerald-100 text-emerald-700",
    },
    cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-700" },
  };
  return (
    configs[status] || {
      label: "Không xác định",
      className: "bg-gray-100 text-gray-700",
    }
  );
};

const OrderPage = () => {
  const {
    orders,
    selectedOrder,
    isFetchingOrders,
    isActionLoading,
    handleViewOrderDetails,
    handleCloseDetails,
    updateOrderStatus,

    meta,
    currentPage,
    handleFilter,
    handleResetFilter,
    handlePageChange,
    initialSearchValue,
  } = OrderHook();

  // State cục bộ cho Filter Form
  const [searchWord, setSearchWord] = useState(initialSearchValue);
  const [statusVal, setStatusVal] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Hàm gọi Handle Filter của Hook
  const onSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();

    // Gói tất cả các state có giá trị vào 1 object và gửi
    const params: any = {};
    if (searchWord) params.search = searchWord;
    if (statusVal) params.status = statusVal;
    if (dateFrom) params.date_from = dateFrom;
    if (dateTo) params.date_to = dateTo;

    handleFilter(params);
  };

  // Hàm Reset
  const onClearFilter = () => {
    setSearchWord("");
    setStatusVal("");
    setDateFrom("");
    setDateTo("");
    handleResetFilter();
  };

  return (
    <div className="space-y-6">
      {/* TOP: Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-6 rounded-2xl border border-border shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ShoppingCart size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-card-foreground">
              Quản lý Đơn hàng
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Khách hàng đặt Online.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-5 py-2.5 rounded-xl hover:bg-muted transition-all text-sm font-bold shadow-sm">
            <FileDown size={18} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* FILTER BAR - Khu vực tìm kiếm sáng tạo dựa trên API của bạn */}
      <FilterOrder
        onSubmitFilter={onSubmitFilter}
        onClearFilter={onClearFilter}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        statusVal={statusVal}
        setStatusVal={setStatusVal}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      {/* CONTENT: Bảng */}
      <div
        className={`bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-opacity duration-300 ${isFetchingOrders ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <Table>
          <TableCaption className="mb-4">
            Danh sách đơn hàng phát sinh trên hệ thống.
          </TableCaption>
          <TitleHeader />
          <OrderBody
            orders={orders}
            getStatusConfig={getStatusConfig}
            handleViewOrderDetails={handleViewOrderDetails}
          />
        </Table>
      </div>

      {/* Phân trang */}
      {meta && meta.last_page > 1 && (
        <ButtonPagination
          meta={meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <OrderFormDrawer
        isOpen={!!selectedOrder}
        onClose={handleCloseDetails}
        order={selectedOrder}
        onUpdateStatus={updateOrderStatus}
        isActionLoading={isActionLoading}
      />
    </div>
  );
};

export default OrderPage;
