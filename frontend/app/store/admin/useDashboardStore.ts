import { create } from "zustand";
import { getDashboardData } from "@/app/services/admin/dashboardService";
import { IDashboardState } from "@/app/types/admin/dashboard";

export const useDashboardStore = create<IDashboardState>((set) => ({
  dashboard: null,
  loading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getDashboardData();
      set({ dashboard: response, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch dashboard data", loading: false });
      console.error("Error fetching dashboard data:", error);
    }
  },
}));
