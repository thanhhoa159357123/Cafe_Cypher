import axiosClient from "@/lib/axios";
import { ICreateOrderPayload } from "../../types/client/order";

export const getOrders = async () => {
  const response = await axiosClient.get("/order");
  return response.data;
};

export const createOrder = async (data: ICreateOrderPayload) => {
  const response = await axiosClient.post("/order", data);
  return response.data;
};

export const cancelOrderService = async (orderId: number, data?: { cancel_reason?: string }) => {
  const response = await axiosClient.put(`/order/${orderId}/cancel`, data);
  return response.data;
};
