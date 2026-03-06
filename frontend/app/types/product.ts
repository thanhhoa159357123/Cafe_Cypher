import { ICategory } from './category'

interface IProduct {
  id: number | string
  name: string
  image: string | null
  description: string
  price: number
  category?: ICategory | null
}

interface ProductState {
  loading: boolean
  error: string | null
  products: IProduct[]

  fetchProducts: () => Promise<void>
}

export type { IProduct, ProductState }
