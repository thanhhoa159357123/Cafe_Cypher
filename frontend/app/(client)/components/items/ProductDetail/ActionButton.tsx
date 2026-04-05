import { CartHook } from "@/app/hooks/client/CartHook";
import { useOrderHook } from "@/app/hooks/client/OrderHook";
import { ISize } from "@/app/types/product";
import { useRouter } from "next/navigation";
import React from "react";

interface ActionButtonProps {
  onClose: () => void;
  product: {
    id: number | string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    sizes?: ISize[];
  };
  selectedSize: {
    id: number | string;
    name: string;
    price: number;
  } | null;
  selectedToppings: {
    id: number | string;
    name: string;
    price: number;
  }[];
}

const ActionButton = ({
  onClose,
  product,
  selectedSize,
  selectedToppings,
}: ActionButtonProps) => {
  const { handleAddToCart } = CartHook();
  const isRequireSizeButNotSelected =
    Array.isArray(product.sizes) &&
    product.sizes.length > 0 &&
    selectedSize === null;
  const { setBuyNowItem } = useOrderHook();
  const router = useRouter();
  return (
    <div className="p-6 pt-4 border-t border-border bg-background flex gap-3">
      <button
        onClick={() => {
          handleAddToCart({
            product_id: product.id,
            size_id: selectedSize?.id ?? null,
            topping_ids: selectedToppings.map((t) => String(t.id)),
            quantity: 1,
          });
        }}
        disabled={isRequireSizeButNotSelected} // Khoá nút nếu chưa chọn size
        className={`flex-1 py-3.5 px-4 rounded-xl font-semibold transition-colors duration-200 shadow-sm
          ${
            isRequireSizeButNotSelected
              ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed" // UI khi bị khoá
              : "bg-primary text-primary-foreground hover:bg-primary/70 hover:shadow-md cursor-pointer" // UI bình thường
          }
        `}
      >
        {isRequireSizeButNotSelected
          ? "Vui lòng chọn Size"
          : "Thêm vào giỏ hàng"}
      </button>

      <button
        disabled={isRequireSizeButNotSelected}
        onClick={() => {
          // 1. Tính toán giá tiền cơ bản
          const sizePrice = selectedSize ? Number(selectedSize.price) : 0;
          const toppingsPrice = selectedToppings.reduce(
            (total, t) => total + Number(t.price),
            0,
          );
          const unitPrice = Number(product.price) + sizePrice + toppingsPrice;

          setBuyNowItem({
            checkout_type: "buy_now",
            product_id: Number(product.id),
            product_name: product.name,
            image_url: product.image,
            size_id: selectedSize ? Number(selectedSize.id) : null,
            size_name: selectedSize ? selectedSize.name : null,
            quantity: 1,

            topping_ids: selectedToppings.map((t) => Number(t.id)),
            topping_names: selectedToppings.map((t) => t.name), // Thêm tên topping để hiển thị sau này
            unit_price: unitPrice,
            total_price: unitPrice, // Mua ngay chỉ mua 1 sản phẩm, nên total_price = unit_price
          });

          onClose();
          router.push("/checkout?type=buy_now");
        }}
        className={`flex-1 py-3.5 px-4 rounded-xl font-semibold border-2 transition-colors duration-200 shadow-md
          ${
            isRequireSizeButNotSelected
              ? "bg-background text-primary/50 border-primary/50 cursor-not-allowed"
              : "bg-background text-primary border-primary hover:bg-primary/20 hover:shadow-xl cursor-pointer"
          }
        `}
      >
        Mua ngay
      </button>
    </div>
  );
};

export default ActionButton;
