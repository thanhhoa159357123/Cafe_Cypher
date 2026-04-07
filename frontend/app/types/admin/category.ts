import { ICategory } from "../base/category";

interface CategoryState {
  loading: boolean;
  error: string | null;
  categories: ICategory[];

  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory | null) => void;

  fetchCategories: () => Promise<void>;
  createCategory: (data: {
    name: string | null;
    parent_id?: number | null;
  }) => Promise<void>;
  updateCategory: (
    id: number | string,
    data: { name: string; parent_id?: number | null },
  ) => Promise<void>;
  deleteCategory: (id: number | string) => Promise<void>;
}

export type { ICategory, CategoryState };
