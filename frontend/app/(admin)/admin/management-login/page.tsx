"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAdminAuthStore } from "@/app/store/admin/useAdminAuthStore";
import { toast } from "sonner";
import { notFound } from "next/navigation";

const adminLoginSchema = z.object({
  email: z.string().email("Vui lòng nhập định dạng email hợp lệ"),
  password: z.string().min(6, "Mật khẩu có ít nhất 6 ký tự"),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

function ManagementLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const secretKey = searchParams.get("key");
  const expectedKey =
    process.env.NEXT_PUBLIC_ADMIN_SECRET || "cafe_cypher_2026";

  const { login, isAuthenticated, access_token, user } = useAdminAuthStore();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // Validate the secret key immediately
  useEffect(() => {
    if (secretKey === expectedKey) {
      setIsValidating(false);
    } else {
      // If the key is missing or wrong, return 404 to hide the page's existence
      notFound();
    }
  }, [secretKey, expectedKey]);

  // Phục hồi phiên làm việc tự động (Auto-login) nếu localStorage (Zustand) còn token
  // nhưng Cookie lỡ bị xóa (do tắt trình duyệt hoặc logout bên Client)
  useEffect(() => {
    const verifyToken = async () => {
      if (!isValidating && isAuthenticated && access_token && user) {
        try {
          // Thử ping API để kiểm tra xem token trong Storage còn sống thực sự không
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
              },
            },
          );

          if (res.ok) {
            // Set lại cookie ngay lập tức để Middleware cho qua
            document.cookie = `auth_token=${access_token}; path=/; max-age=604800`;
            toast.success(
              `Đang khôi phục phiên đăng nhập của ${user.last_name || "Admin"}...`,
            );

            if (user.role === "admin") {
              router.push("/admin/dashboard");
            } else if (user.role === "staff") {
              router.push("/staff/dashboard");
            }
          } else {
            // Token đã chết hoặc bị xóa trên DB -> Xóa luôn storage để không bị loop
            useAdminAuthStore.getState().logout();
          }
        } catch (error) {
          console.error("Lỗi xác thực Auto-login:", error);
        }
      }
    };
    verifyToken();
  }, [isValidating, isAuthenticated, access_token, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      await login(data);

      const currentUser = useAdminAuthStore.getState().user;

      if (currentUser?.role === "admin") {
        toast.success(`Welcome back Admin ${currentUser?.last_name || ""}`);
        router.push("/admin/dashboard");
      } else if (currentUser?.role === "staff") {
        toast.success(`Welcome back Staff ${currentUser?.last_name || ""}`);
        router.push("/staff/dashboard");
      } else {
        toast.error("Không có quyền truy cập hệ thống quản trị.");
        useAdminAuthStore.getState().logout();
      }
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Sai email hoặc mật khẩu/quyền truy cập!";
      toast.error(`❌ ${errorMsg}`);
    }
  };

  // If validating or illegitimate, hide the UI completely.
  if (isValidating) return null;

  return (
    <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 transition-all">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-linear-to-tr from-primary to-primary/40 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
          <Lock className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-widest uppercase">
          Chào mừng
        </h1>
        <p className="text-sm font-medium text-neutral-400 mt-2">
          Chào mừng chủ quán đã quay trở lại! Vui lòng đăng nhập để tiếp tục
          quản lý quán nhé.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider ml-1">
            Admin Email
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 text-white placeholder:text-neutral-600 ${
              errors.email ? "border-red-500/50" : ""
            }`}
            placeholder="admin@cypher.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium pb-1.5">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider ml-1">
            Secret Password
          </label>
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 text-white placeholder:text-neutral-600 pr-14 ${
                errors.password ? "border-red-500/50" : ""
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              {isShowPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 mt-4 font-bold text-white bg-white/10 hover:bg-primary border border-white/5 hover:border-primary rounded-2xl transition-all duration-300 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
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
              AUTHENTICATING...
            </span>
          ) : (
            "ENTER SYSTEM"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ManagementLoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-primary/30">
      {/* Background Decor - Premium Dark Mode Aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-100 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-75 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ManagementLoginForm />
      </Suspense>
    </div>
  );
}
