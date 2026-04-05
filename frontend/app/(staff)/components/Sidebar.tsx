import React from "react";
import Link from "next/link";
import { Coffee, CheckSquare, PackageOpen, LogOut } from "lucide-react";

const Sidebar = () => {
  // MENU RÚT GỌN: Chỉ giữ lại đúng "đồ nghề" của nhân viên pha chế
  const menuItems = [
    {
      label: "Đơn hàng chờ pha",
      href: "/staff/dashboard", // Đổi thành /staff-dashboard thay vì /dashboard
      icon: <Coffee size={20} />,
    },
    {
      label: "Lịch sử đơn",
      href: "/staff/#",
      icon: <CheckSquare size={20} />,
    },
    {
      label: "Tình trạng món", // Nơi để nhân viên gạt nút báo "Hết hàng"
      href: "/staff/#",
      icon: <PackageOpen size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col fixed h-full z-20 shadow-sm text-slate-300">
      {/* TOP: LOGO - Đổi màu chữ cho khác Admin */}
      <div className="p-6 mb-2 border-b border-slate-800">
        <h2 className="text-2xl font-black text-white tracking-tighter">
          CYPHER <span className="text-emerald-500">STAFF</span>
        </h2>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
          Bộ phận vận hành
        </p>
      </div>

      {/* CONTENT: MENU ITEMS */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all cursor-pointer font-medium"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* BOTTOM: LƯU Ý GIAO CA */}
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl cursor-pointer transition-colors">
          <LogOut size={20} />
          Kết thúc ca
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
