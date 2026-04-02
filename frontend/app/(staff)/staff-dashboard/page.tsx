// app/(staff)/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, PlayCircle, Coffee } from "lucide-react";

const StaffDashboard = () => {
  // Giả lập danh sách đơn hàng đang đợi pha chế
  const [orders, setOrders] = useState([
    {
      id: "101",
      table: "Bàn 05",
      items: ["2 Cafe Muối", "1 Bạc xỉu"],
      time: "3 phút trước",
      status: "pending",
    },
    {
      id: "102",
      table: "Mang về",
      items: ["1 Trà đào cam sả (Size L)"],
      time: "8 phút trước",
      status: "preparing",
    },
    {
      id: "103",
      table: "Bàn 12",
      items: ["1 Espresso", "1 Croissant"],
      time: "12 phút trước",
      status: "pending",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quầy Pha Chế</h1>
          <p className="text-sm text-slate-500 font-medium text-emerald-600">
            ● Đang trực tuyến
          </p>
        </div>
        <div className="text-right text-sm text-slate-400 font-bold uppercase tracking-tighter">
          {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>

      {/* Grid danh sách đơn hàng dạng Card */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-white rounded-3xl border-2 shadow-sm overflow-hidden transition-all ${
              order.status === "preparing"
                ? "border-orange-400 ring-4 ring-orange-50"
                : "border-slate-100"
            }`}
          >
            {/* Header của Card */}
            <div
              className={`p-4 flex justify-between items-center ${
                order.status === "preparing"
                  ? "bg-orange-400 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              <span className="font-black text-lg">{order.table}</span>
              <span className="flex items-center gap-1 text-xs font-bold">
                <Clock size={14} /> {order.time}
              </span>
            </div>

            {/* Nội dung món ăn */}
            <div className="p-5 space-y-3">
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 font-bold text-slate-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-dashed border-slate-200 flex gap-2">
                {order.status === "pending" ? (
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                    <PlayCircle size={18} /> Bắt đầu làm
                  </button>
                ) : (
                  <button className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                    <CheckCircle2 size={18} /> Hoàn thành
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer thống kê nhanh cho Staff */}
      <div className="fixed bottom-6 right-6 flex gap-4">
        <div className="bg-white px-6 py-3 rounded-full shadow-xl border border-slate-100 flex items-center gap-3">
          <Coffee className="text-primary" />
          <span className="font-black text-slate-700">Đã xong: 24 ly</span>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
