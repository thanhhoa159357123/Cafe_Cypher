"use client";
import React, { use, useEffect } from "react";
// 1. Import motion và AnimatePresence từ framer-motion
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "../../store/client/useAuthStore";
import AccountInformation from "./items/AccountInformation";
import HistoryOrder from "./items/HistoryOrder";
import { useOrderHook } from "../../hooks/client/OrderHook";
import PopUpDetailOrder from "./items/PopUpDetailOrder";

const AccountPage = () => {
  const { user } = useAuthStore();
  const { orders, fetchOrders } = useOrderHook();

  useEffect(() => {
    fetchOrders();
  }, []);

  const [selectedTab, setSelectedTab] = React.useState("Thông tin cá nhân");
  const tabs = ["Thông tin cá nhân", "Đơn hàng của tôi"];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Tiêu đề */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center mb-10"
      >
        <h1 className="text-4xl font-black text-foreground mb-3 tracking-tight">
          Thông tin cá nhân
        </h1>
        <p className="text-muted-foreground max-w-md">
          Chào mừng bạn đến với thế giới của mình! Quản lý thông tin và theo dõi
          đơn hàng tại đây.
        </p>
      </motion.div>

      {/* THANH TAB - Phần quan trọng nhất */}
      <div className="relative mt-6 border-b border-primary/10 flex gap-2 pb-0 px-2 bg-background top-0 z-10">
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              // 2. Thêm group để handle hover cho phần gạch chân
              className="group relative flex items-center justify-center px-4 py-3 cursor-pointer focus:outline-none"
            >
              {/* Chữ của Tab */}
              <span
                className={`font-semibold transition-colors duration-300 relative z-10
                  ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"}
                `}
              >
                {tab}
              </span>

              {/* 3. HIỆU ỨNG 1: Hover - Gạch chân đi từ giữa ra */}
              {!isSelected && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/40
                             scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300 ease-out origin-center"
                />
              )}

              {/* 4. HIỆU ỨNG 2: Selected - Thanh ngang "bay" mượt mà */}
              <AnimatePresence mode="wait">
                {isSelected && (
                  <motion.div
                    // Mấu chốt là layoutId. Framer Motion sẽ tự tìm thằng có cùng layoutId
                    // ở vị trí mới và tạo animation di chuyển ("bay") mượt mà.
                    layoutId="active_tab_underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-full z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    // Cấu hình spring để tạo cảm giác "tốc hành nhanh" nhưng mượt
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* PHẦN NỘI DUNG DƯỚI TAB (Demo) */}
      <div className="mt-8 p-6 bg-card rounded-2xl border border-border/50 min-h-96 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab === "Thông tin cá nhân" && (
              <AccountInformation user={user} />
            )}
            {selectedTab === "Đơn hàng của tôi" && (
              <HistoryOrder orders={orders} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <PopUpDetailOrder />
    </div>
  );
};

export default AccountPage;
