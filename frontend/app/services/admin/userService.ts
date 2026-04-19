import axiosClient from "@/lib/axios";

export const getUsers = async (role?: string) => {
  const response = await axiosClient.get("/admin/users", {
    params: role ? { role } : {}, // Nếu có role thì gửi, không thì bỏ qua
  });
  return response.data; // Trả về dữ liệu người dùng
};

export const getUserById = async (id: number) => {
  const response = await axiosClient.get(`/admin/users/${id}`);
  return response.data; // Trả về dữ liệu chi tiết người dùng
};

export const toggleUserStatus = async (id: number | string) => {
  const response = await axiosClient.put(`/admin/users/${id}/toggle-status`);
  return response.data;
};

export const deleteUser = async (id: number | string) => {
  const response = await axiosClient.delete(`/admin/users/${id}`);
  return response.data;
};

export const restoreUser = async (id: number | string) => {
  const response = await axiosClient.put(`/admin/users/${id}/restore`);
  return response.data;
};
