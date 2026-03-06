import { create } from 'zustand'
import { getCategories } from '../services/categoryService'
import type { CategoryState, ICategory } from '@/app/types/category'

export const useCategoryStore = create<CategoryState>((set) => ({
  loading: false,
  error: null,
  categories: [],

  selectedCategory: null,

  selectCategory: (category: ICategory | null) =>
    set({ selectedCategory: category }),

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const res = await getCategories()
      set({ categories: res.data, loading: false })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      set({ error: 'Không lấy được dữ liệu', loading: false })
    }
  },
}))
