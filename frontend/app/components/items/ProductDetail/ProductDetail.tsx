'use client'
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { IProduct } from '@/app/types/product'

interface ProductDetailProps {
  product: IProduct
  onClose: () => void
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  console.log('sản phẩm được chọn:', product)
  return (
    <>
      {/* Backdrop - Click vào nền đen để đóng */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-60"
      />

      {/* Modal Content */}
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, y: -50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -50, x: '-50%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-20 left-1/2 z-70 w-full max-w-4xl px-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[80vh]">
          {/* Ảnh sản phẩm bên trái */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
            <Image
              src={product.image ?? '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thông tin bên phải */}
          <div className="p-8 w-full md:w-1/2 flex flex-col overflow-y-auto">
            <button
              onClick={onClose}
              className="self-end text-gray-400 hover:text-black transition-colors"
            >
              ✕ Đóng
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {product.name}
            </h2>
            <p className="text-red-600 text-2xl font-bold mt-2">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.price)}
            </p>

            <div className="mt-4 text-gray-600 leading-relaxed">
              <h3 className="font-semibold text-black">Mô tả món:</h3>
              <p>{product.description}</p>
            </div>

            {/* Chỗ này mai mốt ông giáo đổ Size & Topping vào đây nè */}
            <div className="mt-6 flex-1">
              <p className="text-sm text-gray-400 italic">
                * Tùy chọn Size và Topping sẽ hiển thị ở đây
              </p>
            </div>

            <button className="mt-8 w-full py-4 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg active:scale-95">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProductDetail
