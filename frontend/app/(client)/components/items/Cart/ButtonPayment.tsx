import { ICartItem } from "@/app/types/cart";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonPaymentProps {
  totalPrice: number;
  cartItems: ICartItem[]; // Thêm prop này để truyền danh sách item trong cart vào ButtonPayment
  onClose?: () => void; // Thêm prop này nếu muốn bấm "Tiếp tục mua sắm" thì đóng giỏ hàng
}

const ButtonPayment = ({ totalPrice, onClose }: ButtonPaymentProps) => {
  const router = useRouter();
  return (
    <div className="bg-background border-t border-border p-6 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      {/* Phần hiển thị Tổng tiền */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          Tổng thanh toán:
        </span>
        <span className="text-2xl font-bold text-primary">
          {totalPrice.toLocaleString("vi-VN")}₫
        </span>
      </div>

      {/* Thông báo Freeship (Optional - tạo cảm giác kích thích mua hàng) */}
      {/* {totalPrice > 0 && (
        <div className="mb-5 text-sm text-center text-muted-foreground bg-accent/30 py-2 rounded-lg border border-accent/50">
          Chưa bao gồm phí vận chuyển
        </div>
      )} */}

      {/* Cụm Nút bấm */}
      <div className="flex gap-3">
        {/* Nút Tiếp tục mua sắm */}
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-transparent border-2 border-border px-6 py-3 text-foreground font-medium transition-all hover:bg-accent hover:border-accent hover:text-accent-foreground active:scale-[0.98] cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Tiếp tục mua sắm
        </button>

        {/* Nút Thanh Toán */}
        <button
          disabled={totalPrice === 0}
          onClick={() => {
            if (onClose) onClose(); // Đóng giỏ hàng nếu có hàm onClose (tùy logic dự án)
            router.push("/checkout?type=cart"); // Điều hướng đến trang checkout
          }}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            Tiến hành thanh toán
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
          {/* Hiệu ứng tia sáng lướt qua khi hover */}
          <div className="absolute inset-0 h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
      </div>
    </div>
  );
};

export default ButtonPayment;
