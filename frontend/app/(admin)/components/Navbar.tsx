// app/(admin)/components/Navbar.tsx
import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="font-semibold text-lg">
        {/* Chỗ này mai mốt bắt đường dẫn để hiện Title (VD: Đơn hàng, Sản phẩm) */}
        Dashboard
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
          H
        </div>
        <span className="text-sm font-medium">Bác Hòa</span>
      </div>
    </header>
  );
};

export default Navbar;
