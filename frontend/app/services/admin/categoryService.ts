import axiosClient from "@/lib/axios";

export const getCategories = async () => {
  const response = await axiosClient.get("/admin/categories");
  return response.data;
};

export const createCategory = async (data: {
  name: string;
  parent_id?: number | null;
}) => {
  try {
    const response = await axiosClient.post("/admin/categories", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error);
    throw error; // Ném lỗi để component có thể xử lý
  }
};

export const updateCategory = async (
  id: number | string,
  data: { name: string; parent_id?: number | null },
) => {
  try {
    const response = await axiosClient.put(`/admin/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number | string) => {
  try {
    await axiosClient.delete(`/admin/categories/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    throw error;
  }
};
