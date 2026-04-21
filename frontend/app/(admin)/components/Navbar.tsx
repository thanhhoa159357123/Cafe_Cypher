// app/(admin)/components/Navbar.tsx
"use client";
import React, { useState } from "react";
import { useAdminAuthStore } from "@/app/store/admin/useAdminAuthStore";
import { useAdminRealtimeOrders } from "@/app/hooks/useAdminRealtimeOrders";
import { Bell } from "lucide-react";
import { useOrderStore } from "@/app/store/admin/useOrderStore";

const Navbar = () => {
  const { user } = useAdminAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const notifications = useOrderStore((state) => state.notifications);
  const unreadCount = useOrderStore((state) => state.unreadCount);
  const clearUnread = useOrderStore((state) => state.clearUnread);
  // Khởi động "Camera chạy ngầm" bắt Realtime cho Admin (Gắn trên Navbar là khỏi lo bị mất)
  useAdminRealtimeOrders();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm/50">
      <div className="font-semibold text-lg text-primary tracking-tight">
        {/* Chỗ này mai mốt bắt đường dẫn để hiện Title (VD: Đơn hàng, Sản phẩm) */}
        Dashboard
      </div>

      <div className="flex items-center gap-6">
        {/* Nút Chuông Thông Báo */}
        <div className="relative">
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
              if (unreadCount > 0) clearUnread();
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors relative"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Thông Báo */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-xl shadow-primary/10 overflow-hidden z-50">
              <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm">
                Thông báo gần đây
              </div>
              <div className="max-h-72 overflow-y-auto w-full scrollbar-thin">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground w-full">
                    Chưa có thông báo nào
                  </div>
                ) : (
                  notifications.map((noti) => (
                    <div
                      key={noti.id}
                      className="p-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors w-full cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-primary wrap-break-word flex-1">
                          {noti.title}
                        </p>
                        {/* Nút xóa nhanh nếu bác muốn */}
                        <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          mới
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-0.5 wrap-break-word line-clamp-2">
                        {noti.description}
                      </p>

                      <span className="text-[10px] text-muted-foreground/60 mt-1 block italic">
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
          )}
        </div>

        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-md shadow-primary/20">
            {user?.first_name ? user.first_name.charAt(0).toUpperCase() : "A"}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {user?.last_name || "Admin"} {user?.first_name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
