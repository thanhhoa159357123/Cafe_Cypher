import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import { LoginFormData, RegisterFormData } from "../types/auth";

export const AuthHook = () => {
  const { login, register } = useAuthStore();

  const handleRegister = async (
    data: RegisterFormData,
    onSuccess: () => void,
  ) => {
    try {
      await register(data.lastName, data.firstName, data.email, data.password);

      toast.success("Đăng ký thành công! Mời bạn đăng nhập.");
      onSuccess();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Lỗi kết nối Server!";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  const handleLogin = async (data: LoginFormData, onSuccess: () => void) => {
    try {
      await login(data.email, data.password);

      const currentUser = useAuthStore.getState().user;
      toast.success(`Chào mừng ${currentUser?.first_name}, quay trở lại quán!`);

      onSuccess();
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Sai email hoặc mật khẩu!";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};
