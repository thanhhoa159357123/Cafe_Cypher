interface ICategory {
  category_id: number | string
  category_name: string
  category_slug: string
  children?: ICategory[]
}

interface CategoryState {
  loading: boolean
  error: string | null
  categories: ICategory[]

  selectedCategory: ICategory | null
  setSelectedCategory: (category: ICategory | null) => void

  fetchCategories: () => Promise<void>
}

export type { ICategory, CategoryState }
