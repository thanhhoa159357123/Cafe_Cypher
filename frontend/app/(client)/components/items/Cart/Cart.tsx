import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"; // Bạn nên dùng "framer-motion"
import { ShoppingBag, X, UserX, Coffee } from "lucide-react";
import { User } from "@/app/types/auth";
import { CartHook } from "@/app/hooks/CartHook";
import CartItem from "./CartItem";
import ButtonPayment from "./ButtonPayment";
import Link from "next/link"; // Để điều hướng Login

interface CartProps {
  onClose: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

const Cart = ({ onClose, user, isAuthenticated }: CartProps) => {
  const { cart, updateCartItem, removeCartItem } = CartHook();

  // Tính tổng số lượng ly nước có trong giỏ hàng
  const totalQuantity =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Rỗng nếu mảng item ko tồn tại HOẶC count = 0
  const isCartEmpty = !cart?.items || cart.items.length === 0;

  // Chặn scroll body VÀ chống lỗi giật trang khi mở Giỏ hàng
  useEffect(() => {
    // 1. Tính toán độ rộng của thanh cuộn máy tính người dùng (VD: Windows thường 15px)
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 2. Chèn 15px độ rộng vào bên lề phải của web để bù cho không gian thanh cuộn đã biến mất
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // 3. Khi đóng Cart, gỡ bỏ tất cả để quay về như cũ
    return () => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* NẾN ĐEN PHÍA SAU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60] z-90 pointer-events-auto"
      />

      {/* SIDEBAR CHÍNH */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 w-full md:w-120 lg:w-135 h-dvh bg-background z-100 pointer-events-auto shadow-2xl shadow-black/20 border-l border-border flex flex-col"
      >
        {/* HEADER LUÔN HIỂN THỊ */}
        <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground leading-tight">
                Giỏ hàng của bạn
              </h2>
              {/* Chỉ hiện số lượng NẾU user ĐÃ login và CÓ hàng */}
              {isAuthenticated && user && !isCartEmpty && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Đã chọn {totalQuantity} món
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NỘI DUNG CHÍNH - PHÂN LUỒNG TẠI ĐÂY */}
        {!isAuthenticated || !user ? (
          /* TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-accent/20">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm mb-6 border border-border">
              <UserX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Bạn chưa đăng nhập
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-70">
              Vui lòng đăng nhập để xem những món nước bạn đã chọn và tiến hành
              đặt hàng nhé!
            </p>
            {/* Sử dụng Link của Next.js hoặc thay onClick để trigger Popup Login tùy logic dự án của bạn */}
            <Link
              href="/login"
              onClick={onClose}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              Đăng nhập ngay
            </Link>
          </div>
        ) : isCartEmpty ? (
          /* TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP NHƯNG GIỎ HÀNG TRỐNG */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-accent/10">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm mb-6 border border-border">
              <Coffee className="w-10 h-10 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Giỏ hàng trống
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-70">
              Bạn chưa chọn món nước nào! Về lại menu và thêm vài ly cafe thơm
              ngon nhé.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              Quay lại Menu
            </button>
          </div>
        ) : (
          /* TRƯỜNG HỢP 3: ĐÃ ĐĂNG NHẬP VÀ CÓ HÀNG RỒI */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-accent/10 relative custom-scrollbar">
              <CartItem
                cartItems={cart?.items || []}
                handleUpdateQuantity={updateCartItem}
                handleRemoveItem={removeCartItem}
              />
            </div>

            {/* HIỆN NÚT THANH TOÁN (Chỉ gọi khi List đang có) */}
            <div className="flex-none bg-background border-t border-border mt-auto">
              <ButtonPayment
                cartItems={cart?.items || []}
                totalPrice={cart?.total_price || 0}
                onClose={onClose}
              />
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
