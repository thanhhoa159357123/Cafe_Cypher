"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import ProfileButton from "./ProfileButton";
import { NavbarHook } from "@/app/hooks/client/NavbarHook";
import { ShoppingCartIcon, Bell } from "lucide-react";
import Cart from "./Cart/Cart";
import { useClientRealtimeOrders } from "@/app/hooks/useClientRealtimeOrders";
import { useOrderStore } from "@/app/store/client/useOrderStore";
import { useState } from "react";

const Navbar = () => {
  // Bật quét Real-time trạng thái đơn hàng ngầm bên Client ở mọi trang
  useClientRealtimeOrders();
  const { unreadCount, clearUnread, notifications } = useOrderStore();
  const [showNoti, setShowNoti] = useState(false);

  const {
    handleOpenLogin,
    handleCloseLogin,
    handleOpenRegister,
    handleCloseRegister,
    handleCategoryClick,
    isOpenLogin,
    isOpenRegister,
    isAuthenticated,
    user,
    logout,
    categories,
    isMounted,

    // Cart
    isOpenCart,
    handleOpenCart,
    handleCloseCart,
    totalItemsInCart,
  } = NavbarHook();

  return (
    <div className="sticky top-0 inset-x-0 px-3 py-1 border-b rounded-b-lg border-foreground bg-primary-lighter/70 shadow-xl z-50">
      <div className="flex justify-between items-center">
        {/* Right */}
        <Link href="/" className="px-2 py-1">
          <h1 className="text-lg font-semibold">Cypher_Cafe</h1>
        </Link>
        {/* Middle */}
        <div className="flex gap-6">
          {categories.map((category) => (
            <span
              key={category.id}
              // Thêm relative và group vào class
              className="relative group font-medium text-md cursor-pointer hover:text-secondary-foreground transition-colors duration-300"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {/* Thêm thẻ span này để làm đường gạch chân */}
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 bg-secondary-foreground transition-all duration-300 group-hover:w-full"></span>
            </span>
          ))}
        </div>
        {/* Left */}
        <div>
          {!isMounted ? (
            <div className="w-37.5 h-10 bg-muted animate-pulse rounded-md" /> // Skeleton lúc đang load
          ) : isAuthenticated && user ? (
            <div className="flex items-center justify-center gap-6">
              {/* Nút Chuông Thông Báo */}
              <div className="relative">
                {/* <button
                  onClick={() => {
                    setShowNoti(!showNoti);
                    if (unreadCount > 0) clearUnread();
                  }}
                  className="relative cursor-pointer hover:opacity-80 transition-opacity flex items-center"
                >
                  <Bell width={24} height={24} className="text-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button> */}

                {/* {showNoti && (
                  <div className="absolute right-0 mt-4 w-87.5 bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-50">
                    <div className="p-3 border-b border-border bg-muted/30 font-semibold text-sm">
                      Thông báo từ quán
                    </div>
                    <div className="max-h-72 overflow-y-auto scrollbar-thin">
                      {notifications.length === 0 ? (
                        <div className="p-5 text-center text-sm text-muted-foreground w-full">
                          Chưa có thông báo nào
                        </div>
                      ) : (
                        notifications.map((noti) => (
                          <div
                            key={noti.id}
                            className="p-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors w-full"
                          >
                            <p className="text-sm font-medium w-full wrap-break-word">
                              {noti.message}
                            </p>
                            <span className="text-xs text-muted-foreground mt-1 block">
                              {new Date(noti.time).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )} */}
              </div>

              {/* Vùng chứa Icon giỏ hàng có position relative */}
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                <ShoppingCartIcon
                  width={24}
                  height={24}
                  className="text-foreground"
                  onClick={handleOpenCart}
                />
                {/* Chấm tròn hiển thị số lượng (Badge) */}
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
                  {totalItemsInCart}
                </span>
              </div>
              <ProfileButton user={user} logOut={logout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={handleOpenLogin}>Đăng nhập</Button>
              <Button onClick={handleOpenRegister}>Đăng ký</Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpenLogin && (
          <FormLogin
            onClose={handleCloseLogin}
            onOpenRegister={handleOpenRegister}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpenRegister && (
          <FormRegister
            onClose={handleCloseRegister}
            onOpenLogin={handleOpenLogin}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenCart && (
          <Cart
            onClose={handleCloseCart}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
