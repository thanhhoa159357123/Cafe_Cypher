// CategoryList.tsx
import { ICategory } from "@/app/types/base/category";

interface CategoryListProps {
  categories: ICategory;
  childItems: ICategory[];
  selectedCategory: ICategory | null;
  onSelectCategory: (category: ICategory | null) => void;
  handleChildCategoryClick: (parentSlug: string, childSlug: string) => void;
}
const CategoryList = ({
  categories,
  childItems,
  selectedCategory,
  onSelectCategory,
  handleChildCategoryClick,
}: CategoryListProps) => {
  return (
    <div
      key={categories.id}
      className="sticky top-18.25 bg-white rounded-lg shadow-sm mb-6 p-4 z-40"
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-1 h-6 bg-foreground rounded-full"></div>
        <span className="text-lg font-semibold text-primary">
          {categories.name}
        </span>
        <span className="text-sm text-primary">({childItems.length})</span>
      </div>

      {childItems.length > 0 && (
        <div className="space-y-2">
          {childItems.map((child) => (
            <div
              key={child.id}
              onClick={() => {
                onSelectCategory(child);
                handleChildCategoryClick(categories.slug, child.slug);
              }}
              className={`ml-4 px-3 py-2.5 border-l-2 border-primary-lighter hover:border-secondary-foreground hover:bg-secondary-foreground/50 transition-all duration-300 cursor-pointer group rounded-md ${selectedCategory?.id === child.id ? "border-secondary-foreground text-background bg-secondary-foreground/50" : ""}`}
            >
              <span className="group-hover:text-background font-medium transition-colors duration-300">
                {child.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
