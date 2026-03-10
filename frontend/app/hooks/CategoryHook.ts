'use client'

import { useEffect } from 'react'
import { useCategoryStore } from '../store/useCategoryStore'

export const CategoryHook = () => {
  const { categories, selectedCategory, setSelectedCategory, fetchCategories } =
    useCategoryStore()

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
  }
}
