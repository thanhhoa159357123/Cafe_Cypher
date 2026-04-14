import { IAdminOrder } from "./order";

export interface IDashboard {
  stats: {
    total_revenue: number;
    new_orders: number;
    total_products: number;
    total_customers: number;
  };
  recent_orders: IAdminOrder[];
  chart_data: {
    date: string; // ISO date string
    revenue: number;
  }[];
}

export interface IDashboardState {
  dashboard: IDashboard | null;
  loading: boolean;
  error: string | null;

  fetchDashboard: () => Promise<void>;
}
