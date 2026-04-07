import { ICategory } from "../base/category";

interface CategoryState {
  loading: boolean;
  error: string | null;
  categories: ICategory[];

  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory | null) => void;

  fetchCategories: () => Promise<void>;
}

export type { ICategory, CategoryState };
