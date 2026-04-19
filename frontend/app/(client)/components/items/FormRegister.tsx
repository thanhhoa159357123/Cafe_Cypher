import React from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/app/types/client/auth";
import { Eye, EyeClosed } from "lucide-react";
import { AuthHook } from "@/app/hooks/client/AuthHook";

interface FormRegisterProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

const FormRegister = ({ onClose, onOpenLogin }: FormRegisterProps) => {
  const { handleRegister, isShowPassword, handleShowPassword } = AuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    handleRegister(data, () => {
      onClose();
      onOpenLogin();
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
        key="register-modal-content"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md p-8 bg-background rounded-2xl shadow-2xl border border-border/50 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-primary mb-2">CAFE CYPHER</h1>
          <p className="text-muted-foreground mb-6">
            Chào mừng đến với Cypher Cafe! Hãy đăng ký để trải nghiệm những điều
            tuyệt vời tại quán chúng tôi.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground/80 mb-1">
                Họ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("lastName")}
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition duration-200 placeholder:text-muted-foreground/50 ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-input focus:border-primary"
                }`}
                placeholder="Nguyen"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground/80 mb-1">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("firstName")}
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition duration-200 placeholder:text-muted-foreground/50 ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-input focus:border-primary"
                }`}
                placeholder="Van A"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition duration-200 placeholder:text-muted-foreground/50 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-input focus:border-primary"
              }`}
              placeholder="admin@gmail.com"
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
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 font-bold text-primary-foreground bg-primary rounded-xl hover:bg-primary-light active:bg-primary transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ NGAY"}
          </button>
        </form>

        {/* Chuyển sang đăng nhập */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Bạn đã có tài khoản?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="font-medium text-primary hover:text-primary-light underline-offset-2 hover:underline transition-colors cursor-pointer"
          >
            Đăng nhập ngay
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FormRegister;
