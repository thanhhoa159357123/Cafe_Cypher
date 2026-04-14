import { useAuthStore } from "../../store/client/useAuthStore";
import { toast } from "sonner";
import { LoginFormData, RegisterFormData } from "../../types/client/auth";
import { useEffect, useState } from "react";

export const AuthHook = () => {
  const { login, register, updateUser, fetchUser } = useAuthStore();
  const [isShowPassword, setIsShowPassword] = useState(false);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const handleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleRegister = async (
    data: RegisterFormData,
    onSuccess: () => void,
  ) => {
    try {
      await register(
        data.lastName,
        data.firstName,
        data.email,
        data.password,
        "client",
      );

      toast.success("Đăng ký thành công! Mời bạn đăng nhập.");
      onSuccess();
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Lỗi kết nối Server!";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  const handleLogin = async (data: LoginFormData, onSuccess: () => void) => {
    try {
      await login(data.email, data.password);

      const currentUser = useAuthStore.getState().user;
      toast.success(`Chào mừng ${currentUser?.first_name}, quay trở lại quán!`);

      onSuccess();
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Sai email hoặc mật khẩu!";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  const handleUpdateUser = async (data: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    const toastId = toast.loading("Đang lưu thay đổi...");
    try {
      // Gọi thẳng action từ Store
      await updateUser(data);

      toast.success("Cập nhật thông tin thành công!", { id: toastId });
      return true;
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Lỗi khi cập nhật thông tin!";
      toast.error(`❌ ${errorMsg}`, { id: toastId });
      return false;
    }
  };

  return {
    handleLogin,
    handleRegister,
    isShowPassword,
    handleShowPassword,
    handleUpdateUser,
  };
};
