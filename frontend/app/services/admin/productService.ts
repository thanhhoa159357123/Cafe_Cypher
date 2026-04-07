import axiosClient from "@/lib/axios";

export const getProducts = async (page: number = 1) => {
  const response = await axiosClient.get(`/admin/products?page=${page}`);
  return response.data;
};
