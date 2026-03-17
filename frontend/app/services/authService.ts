import axiosClient from "@/lib/axios";

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
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosClient.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
