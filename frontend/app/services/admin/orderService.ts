import axiosClient from "@/lib/axios";

export const getAllOrders = async (page: number = 1) => {
  const response = await axiosClient.get(`/admin/orders?page=${page}`);
  return response.data;
};

export const getOrder = async (id: number | string) => {
  const response = await axiosClient.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (data: {
  id: number | string;
  status: string;
  cancel_reason?: string;
}) => {
  const response = await axiosClient.put(`/admin/orders/${data.id}/status`, {
    status: data.status,
    cancel_reason: data.cancel_reason,
  });
  return response.data;
};

export const filterOrders = async (data: any) => {
  const response = await axiosClient.get(`/admin/orders/filtered`, {
    params: data,
  });
  return response.data;
};
