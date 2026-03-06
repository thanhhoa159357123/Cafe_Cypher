'use client'

import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

export const ProductHook = () => {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { products }
}
