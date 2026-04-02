import axiosClient from "@/lib/axios";
import { ICreateOrderPayload } from "../types/order";

export const getOrders = async () => {
  const response = await axiosClient.get("/order");
  return response.data;
};

export const createOrder = async (data: ICreateOrderPayload) => {
  const response = await axiosClient.post("/order", data);
  return response.data;
};
