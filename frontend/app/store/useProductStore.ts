import { create } from 'zustand'
import { getProducts } from '../services/productService'
import type { ProductState } from '@/app/types/product'

export const useProductStore = create<ProductState>((set) => ({
  loading: false,
  error: null,
  products: [],

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const res = await getProducts()
      set({ products: res.data, loading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: 'Không lấy được dữ liệu', loading: false })
    }
  },
}))
