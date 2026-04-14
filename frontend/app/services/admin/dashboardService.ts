import axiosClient from "@/lib/axios";

export const getDashboardData = async () => {
  const response = await axiosClient.get("/admin/dashboard");
  return response.data;
};
