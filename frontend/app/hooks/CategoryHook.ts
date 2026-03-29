'use client'

import { useEffect } from 'react'
import { useCategoryStore } from '../store/useCategoryStore'

export const CategoryHook = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryStore()

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
  }
}
