import { IProduct } from "@/app/types/base/product";
import axiosClient from "@/lib/axios";

export const getProducts = async (page: number = 1) => {
  const response = await axiosClient.get(`/admin/products?page=${page}`);
  return response.data;
};

export const createProduct = async (data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", String(data.price));
  if (data.description) formData.append("description", data.description);
  if (data.category_id)
    formData.append("category_id", String(data.category_id));

  // Gửi file bằng tên "image_url" cho giống backend
  if (data.image) {
    formData.append("image_url", data.image);
  }

  // Ép sizes và toppings thành chuỗi JSON do backend có hỗ trợ map json decode
  if (data.sizes && data.sizes.length > 0) {
    formData.append("sizes", JSON.stringify(data.sizes));
  }
  if (data.toppings && data.toppings.length > 0) {
    formData.append("toppings", JSON.stringify(data.toppings));
  }

  const response = await axiosClient.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async (id: number | string, data: any) => {
  try {
    const formData = new FormData();

    // Laravel cần spoofing method cho multipart/form-data
    formData.append("_method", "PUT");

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    if (data.description) formData.append("description", data.description);

    // Lưu ý update form truyền category là null/object, tùy chỉnh lấy id:
    if (data.category?.id) {
      formData.append("category_id", String(data.category.id));
    } else if (data.category.id) {
      formData.append("category_id", String(data.category_id));
    }

    // Chỉ append image nếu nó là File object (người dùng có upload ảnh mới)
    if (data.image && typeof data.image !== "string") {
      formData.append("image_url", data.image);
    }

    // Ép kiểu array thành JSON string giống hệt lúc Create
    if (data.sizes && data.sizes.length > 0) {
      formData.append("sizes", JSON.stringify(data.sizes));
    }
    if (data.toppings && data.toppings.length > 0) {
      formData.append("toppings", JSON.stringify(data.toppings));
    }

    // Thay đổi từ put -> post để gửi FormData
    const response = await axiosClient.post(`/admin/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number | string) => {
  const response = await axiosClient.delete(`/admin/products/${id}`);
  return response.data;
};

export const toggleProductStatus = async (id: number | string) => {
  const response = await axiosClient.put(`/admin/products/${id}/toggle-status`);
  return response.data;
};

export const restoreProduct = async (id: number | string) => {
  const response = await axiosClient.put(`/admin/products/${id}/restore`);
  return response.data;
};

export const filterProduct = async (data: any) => {
  const response = await axiosClient.get(`/admin/products/filtered`, {
    params: data,
  });
  return response.data;
};
