"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { IProduct, ISize, ITopping } from "@/app/types/product";
import SizeAndTopping from "./SizeAndTopping";
import { X } from "lucide-react";
import ActionButton from "./ActionButton";

interface ProductDetailProps {
  product: IProduct;
  onClose: () => void;
  selectedSize: ISize | null;
  setSelectedSize: (size: ISize | null) => void;
  selectedToppings: ITopping[];
  setSelectedToppings: (topping: ITopping) => void;
}

const ProductDetail = ({
  product,
  onClose,
  selectedSize,
  setSelectedSize,
  selectedToppings,
  setSelectedToppings,
}: ProductDetailProps) => {
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
        className="fixed inset-0 bg-black/40 z-40 pointer-events-auto"
      />

      {/* Modal Content */}
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto h-auto bg-linear-to-br from-background via-card to-background rounded-xl border border-border shadow-sm relative">
          <div className="flex flex-col p-4">
            <div className="flex flex-col md:flex-row justify-center mt-4 mb-4 items-center md:items-start gap-8">
              {/* Ảnh sản phẩm bên trái */}
              <div className="relative w-full max-w-xs shrink-0">
                <Image
                  src={product.image ?? "/placeholder.png"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="relative rounded-2xl object-cover border border-primary/20 shadow-lg"
                  priority
                />
                {!product.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">
                      Chưa có ảnh
                    </span>
                  </div>
                )}
              </div>

              {/* Thông tin bên phải */}
              <div className="flex flex-col space-y-4 flex-1">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {product?.name}
                  </h1>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                    {product?.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>

                {product?.description && (
                  <div className="border-t border-primary/10 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
                <SizeAndTopping
                  product={product}
                  sizes={product.sizes}
                  toppings={product.toppings}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  selectedToppings={selectedToppings}
                  setSelectedToppings={setSelectedToppings}
                />
              </div>
            </div>

            {/* Các nút hành động */}
            <ActionButton />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
