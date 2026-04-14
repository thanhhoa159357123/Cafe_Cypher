import axiosClient from "@/lib/axios";

export const getMe = async () => {
  try {
    const response = await axiosClient.get("/me"); // Đường dẫn này bác tạo ở Laravel nhé
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosClient.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (data: {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  role: "client" | "admin" | "staff";
}) => {
  try {
    const response = await axiosClient.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const updateInformation = async (data: {
  first_name?: string;
  last_name?: string;
  email?: string;
}) => {
  try {
    const response = await axiosClient.put("/user/update-info", data);
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
