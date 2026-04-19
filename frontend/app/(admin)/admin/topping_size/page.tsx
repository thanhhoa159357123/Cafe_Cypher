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
import Size_TopingFromDrawer from "../../components/FormDrawer/SizeTopping/Size_ToppingFormDrawer";
import ItemSize from "./tab_items/ItemSize";
import ItemTopping from "./tab_items/ItemTopping";

const tabs = [
  { value: "sizes", label: "Size" },
  { value: "toppings", label: "Topping" },
];

const ToppingAndSizePage = () => {
  const {
    sizes,
    selectedSize,
    toppings,
    selectedTopping,
    isOpenDrawer,
    setIsOpenDrawer,
    drawerMode,
    typeDrawer,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseDrawer,
    loading,
    handleDrawerSubmitSize,
    handleDeleteSize,
    handleToggleSizeStatus,
    handleRestoreSize,
    handleDrawerSubmitTopping,
    handleDeleteTopping,
    handleToggleToppingStatus,
    handleRestoreTopping,
  } = SizeToppingHook();
  const [activeTab, setActiveTab] = useState("sizes");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-card-foreground">
              Topping & Kích cỡ
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Quản lý các lựa chọn cộng thêm giá cho thức uống.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs với Sliding Indicator */}
      <Tabs
        defaultValue="sizes"
        className="w-full"
        onValueChange={setActiveTab}
      >
        {/* Container Tab List */}
        <TabsList className="relative flex w-fit p-1 bg-muted/50 rounded-xl h-auto mb-4 border border-border/50">
          {/* Sliding indicator */}
          <div
            className={`absolute top-1 bottom-1 left-1 w-[100px] bg-card rounded-lg shadow-sm transition-transform duration-300 ease-in-out z-0 ${
              activeTab === "toppings" ? "translate-x-[100px]" : "translate-x-0"
            }`}
          />

          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative w-[100px] px-0 py-2.5 font-bold text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent transition-colors cursor-pointer z-10"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div
          className={`bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Tab Kích cỡ */}
          <ItemSize
            sizes={sizes}
            onOpenCreate={handleOpenCreate}
            onOpenEdit={handleOpenEdit}
            onDelete={handleDeleteSize}
            onToggleStatus={handleToggleSizeStatus}
            onRestore={handleRestoreSize}
          />

          {/* Tab Topping */}
          <ItemTopping
            toppings={toppings}
            onOpenCreate={handleOpenCreate}
            onOpenEdit={handleOpenEdit}
            onDelete={handleDeleteTopping}
            onToggleStatus={handleToggleToppingStatus}
            onRestore={handleRestoreTopping}
          />
        </div>
      </Tabs>

      {/* Drawer chung */}
      <Size_TopingFromDrawer
        isOpen={isOpenDrawer}
        mode={drawerMode}
        type={typeDrawer}
        onClose={handleCloseDrawer}
        onSubmit={
          typeDrawer === "size"
            ? handleDrawerSubmitSize
            : handleDrawerSubmitTopping
        }
        initialData={typeDrawer === "size" ? selectedSize : selectedTopping}
      />
    </div>
  );
};

export default ToppingAndSizePage;
