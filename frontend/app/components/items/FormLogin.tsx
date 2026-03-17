import React, { useState } from "react";
import { motion } from "motion/react"; // Lưu ý: motion/react hoặc framer-motion tùy bản bác cài
import axios from "axios";
import { useAuthStore } from "@/app/store/useAuthStore";

interface FormLoginProps {
  isOpen: boolean | null;
  onClose: () => void;
}

const FormLogin = ({ isOpen, onClose }: FormLoginProps) => {
  const [email, setEmail] = useState("");
  const { login } = useAuthStore();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Đang kết nối...");

    try {
      await login(email, password);

      setMessage("✅ Đăng nhập ngon lành! Token đã in ở Console.");

    } catch (error: any) {
      // Nếu lỗi (Sai pass, thiếu trường...)
      const errorMsg = error.response?.data?.message || "Lỗi kết nối Server!";
      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-800 mb-2">
            CAFE CYPHER
          </h1>
          <p className="text-gray-500 mb-6">
            Nhập tài khoản để test API bác ơi
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            ĐĂNG NHẬP NGAY
          </button>
        </form>

        {/* Thông báo kết quả */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {message}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full text-gray-400 text-sm hover:underline"
        >
          Đóng lại
        </button>
      </motion.div>
    </>
  );
};

export default FormLogin;
