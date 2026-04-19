import React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/app/types/client/auth";
import { Eye, EyeClosed } from "lucide-react";
import { AuthHook } from "@/app/hooks/client/AuthHook";

interface FormLoginProps {
  onClose: () => void;
  onOpenRegister: () => void;
}

const FormLogin = ({ onClose, onOpenRegister }: FormLoginProps) => {
  const { handleLogin, isShowPassword, handleShowPassword } = AuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data, () => {
      onClose(); // Đăng nhập xong thì đóng
    });
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* Modal Content */}
      <motion.div
        key="login-modal-content"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md p-8 bg-background rounded-2xl shadow-2xl border border-border/50"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-primary mb-2">CAFE CYPHER</h1>
          <p className="text-muted-foreground mb-6">
            Chào mừng bạn đến với quán cà phê của chúng tôi! Hãy đăng nhập để
            trải nghiệm những điều tuyệt vời mà chúng tôi mang lại.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition duration-200 placeholder:text-muted-foreground/50 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-input focus:border-primary"
              }`}
              placeholder="client@gmail.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Mật khẩu
            </label>
            {/* THÊM position 'relative' vào thẻ bó khung ngoài */}
            <div className="relative">
              <input
                // SỬ DỤNG STATE ĐỂ ĐỔI TYPE: password <-> text
                type={isShowPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition duration-200 placeholder:text-muted-foreground/50 pr-12 /* pr-12: Chừa chỗ trống cho con mắt chèn vô */ ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-input focus:border-primary"
                }`}
                placeholder="••••••"
                autoComplete="current-password"
              />

              {/* NÚT BẤM CON MẮT */}
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {isShowPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting} // Phím sẽ bị vô hiệu hóa khi đang submit
            className={`w-full py-3.5 mt-2 font-bold text-primary-foreground bg-primary rounded-xl transition-all duration-200 shadow-md ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed" // UI khi đang tải
                : "hover:bg-primary-light active:bg-primary hover:shadow-lg cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                ĐANG XỬ LÝ...
              </span>
            ) : (
              "ĐĂNG NHẬP NGAY"
            )}
          </button>
        </form>

        {/* Chuyển sang đăng ký */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Bạn chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="font-medium text-primary hover:text-primary-light underline-offset-2 hover:underline transition-colors cursor-pointer"
          >
            Đăng ký ngay
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FormLogin;
