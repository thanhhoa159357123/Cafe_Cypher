"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

// Custom Tooltip với style theme
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-4">
        <p className="font-bold text-card-foreground mb-1 text-sm">
          Ngày {label}
        </p>
        <p className="text-primary font-extrabold text-base tracking-tight">
          {Number(payload[0].value).toLocaleString("vi-VN")} đ
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground italic font-medium bg-muted/20 rounded-xl">
        Chưa có dữ liệu biểu đồ
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--border))"
          opacity={0.6}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "hsl(var(--muted-foreground))",
            fontWeight: 500,
          }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "hsl(var(--muted-foreground))",
            fontWeight: 500,
          }}
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toLocaleString("vi-VN")}k` : value
          }
          width={50}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: "hsl(var(--primary))",
            strokeWidth: 1.5,
            strokeDasharray: "4 4",
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          activeDot={{ r: 5, strokeWidth: 0, fill: "hsl(var(--primary))" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
