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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Edit, Trash2, Layers } from "lucide-react";
import { SizeToppingHook } from "@/app/hooks/admin/SizeToppingHook";

const ToppingAndSizePage = () => {
  const { sizes, toppings } = SizeToppingHook();
  const [activeTab, setActiveTab] = useState("sizes");

  return (
    <div className="space-y-6">
      {/* TOP: Header chung (Style theo tông Cream/Coffee) */}
      <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary-light text-primary rounded-lg">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              Topping & Kích Cỡ
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Quản lý các lựa chọn cộng thêm giá cho thức uống.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs có hiệu ứng Sliding Indicator */}
      <Tabs
        defaultValue="sizes"
        className="w-full"
        onValueChange={setActiveTab}
      >
        {/* Container Tab List */}
        <TabsList className="relative flex w-fit p-1 bg-secondary-light/60 rounded-lg h-auto mb-4 border border-border/50">
          {/* Cục nền chạy qua chạy lại (Sliding indicator) */}
          <div
            className={`absolute top-1 bottom-1 left-1 w-37.5 bg-card rounded-md shadow-sm transition-transform duration-300 ease-in-out z-0 ${
              activeTab === "toppings" ? "translate-x-37.5" : "translate-x-0"
            }`}
          />

          {/* Tab Kích cỡ */}
          <TabsTrigger
            value="sizes"
            className="relative w-37.5 px-0 py-2.5 font-bold text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent transition-colors"
          >
            Kích cỡ (Size)
          </TabsTrigger>

          {/* Tab Topping */}
          <TabsTrigger
            value="toppings"
            className="relative w-37.5 px-0 py-2.5 font-bold text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent transition-colors"
          >
            Topping thêm
          </TabsTrigger>
        </TabsList>

        {/* --- TAB KÍCH CỠ --- */}
        <TabsContent value="sizes" className="mt-0 outline-none">
          <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all text-sm font-bold shadow-md hover:shadow-lg">
              <PlusCircle size={18} />
              Thêm kích cỡ
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <Table className="table-fixed w-full">
              <TableCaption className="mb-4 text-muted-foreground">
                Danh sách kích cỡ của phân loại sản phẩm.
              </TableCaption>
              <TableHeader className="bg-secondary-light/30 border-b border-border">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-25 font-bold text-primary">
                    Mã
                  </TableHead>
                  <TableHead className="font-bold text-primary w-auto">
                    Tên kích cỡ
                  </TableHead>
                  <TableHead className="text-right font-bold text-primary w-30">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border/50">
                {sizes.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-accent-light/50 transition-colors"
                  >
                    <TableCell className="font-semibold text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-black text-foreground">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-primary hover:text-primary-light hover:bg-secondary/20 p-1.5 rounded-md transition-all">
                          <Edit size={18} />
                        </button>
                        <button className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 p-1.5 rounded-md transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* --- TAB TOPPING --- */}
        <TabsContent value="toppings" className="mt-0 outline-none">
          <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all text-sm font-bold shadow-md hover:shadow-lg">
              <PlusCircle size={18} />
              Thêm Topping
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <Table className="table-fixed w-full">
              <TableCaption className="mb-4 text-muted-foreground">
                Danh sách topping và phụ thu tương ứng.
              </TableCaption>
              <TableHeader className="bg-secondary-light/30 border-b border-border">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-25 font-bold text-primary">
                    Mã
                  </TableHead>
                  <TableHead className="font-bold text-primary w-auto">
                    Tên Topping
                  </TableHead>
                  <TableHead className="font-bold text-primary text-right w-37.5">
                    Phụ thu
                  </TableHead>
                  <TableHead className="text-right font-bold text-primary w-30">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border/50">
                {toppings.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-accent-light/50 transition-colors"
                  >
                    <TableCell className="font-semibold text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-black text-foreground">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right font-black text-primary">
                      {/* Dùng format VNĐ nếu có số thực tế, ví dụ: {item.price.toLocaleString()}đ */}
                      {item.price}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-primary hover:text-primary-light hover:bg-secondary/20 p-1.5 rounded-md transition-all">
                          <Edit size={18} />
                        </button>
                        <button className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 p-1.5 rounded-md transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToppingAndSizePage;
