import axiosClient from "@/lib/axios";

export const getSizes = async () => {
  const res = await axiosClient.get("/admin/sizes");
  return res.data;
};

export const getToppings = async () => {
  const res = await axiosClient.get("/admin/toppings");
  return res.data;
};
