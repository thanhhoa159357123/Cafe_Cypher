import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm">
      <div className="font-semibold text-lg text-emerald-600 flex items-center gap-2">
        {/* Dấu chấm nhấp nháy báo hiệu máy Pos đang online */}
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
        Quầy Pha Chế
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">
          NV
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none text-slate-800">
            Nhân viên 01
          </span>
          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
            Ca Tối
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
