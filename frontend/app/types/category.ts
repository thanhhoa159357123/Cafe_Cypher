interface ICategory {
  id: number | string
  name: string
  slug: string
  children?: ICategory[]
}

interface CategoryState {
  loading: boolean
  error: string | null
  categories: ICategory[]

  selectedCategory: ICategory | null
  selectCategory: (category: ICategory | null) => void

  fetchCategories: () => Promise<void>
}

export type { ICategory, CategoryState }
