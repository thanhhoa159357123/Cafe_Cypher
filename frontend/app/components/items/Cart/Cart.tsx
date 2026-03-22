import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, X } from "lucide-react";
import { User } from "@/app/types/auth";

interface CartProps {
  onClose: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

const Cart = ({ onClose, user, isAuthenticated }: CartProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 pointer-events-auto"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 w-150 h-screen bg-background z-50 pointer-events-auto shadow-2xl shadow-black/20 border-l border-border"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-primary/10">
            <div className="flex items-center justify-center gap-2 p-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Giỏ hàng
              </span>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          {isAuthenticated && user ? (
            <>
              <div className="flex-1 p-4">
                <p>Giỏ hàng của {user.email}</p>
              </div>
              <div>
                <button>Tiếp tục mua sắm</button>
                <button>Thanh toán</button>
              </div>
            </>
          ) : (
            <div className="flex-1 p-4">
              <p>Vui lòng đăng nhập để xem giỏ hàng</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
