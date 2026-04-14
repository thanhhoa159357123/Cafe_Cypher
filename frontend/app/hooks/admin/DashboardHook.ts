"use client";

import { useDashboardStore } from "@/app/store/admin/useDashboardStore";
import { useEffect } from "react";

export const DashboardHook = () => {
  const { dashboard, loading, error, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
};
