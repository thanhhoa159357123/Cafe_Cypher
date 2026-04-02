"use client";
import { User } from "@/app/types/auth";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { AuthHook } from "@/app/hooks/AuthHook";

interface AccountInformationProps {
  user: User | null;
}

const AccountInformation = ({ user }: AccountInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleUpdateUser } = AuthHook();

  // Đưa email vào state để User có thể gõ thay đổi
  const [formData, setFormData] = useState({
    last_name: user?.last_name || "",
    first_name: user?.first_name || "",
    email: user?.email || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Gửi toàn bộ data (bao gồm cả email mới) xuống Hook -> Store -> API
    const success = await handleUpdateUser({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
    });

    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Hồ sơ của bạn</h3>
        {user && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            Chỉnh sửa hồ sơ
          </button>
        )}
      </div>

      {user ? (
        <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Họ:</span>
            <span className="font-medium">{user.last_name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <span className="text-muted-foreground">Tên:</span>
            <span className="font-medium">{user.first_name}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium text-muted-foreground/80">
              {user.email}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground animate-pulse">
          Đang tải thông tin hồ sơ...
        </div>
      )}

      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-background w-full max-w-md rounded-2xl shadow-2xl p-6 mx-4 pointer-events-auto border border-border"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Cập nhật thông tin</h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Họ</label>
                      <input
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        className="w-full p-3 rounded-lg border border-input bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tên</label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        className="w-full p-3 rounded-lg border border-input bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  {/* 👇 ĐÃ MỞ KHÓA Ô EMAIL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-lg border border-input bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-3 rounded-xl border border-input font-semibold hover:bg-muted transition-colors cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountInformation;
