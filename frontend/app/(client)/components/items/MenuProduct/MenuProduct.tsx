"use client";

import { CategoryHook } from "@/app/hooks/client/CategoryHook";
import { ProductHook } from "@/app/hooks/client/ProductHook";
import CategoryList from "./items/CategoryList";
import ProductList from "./items/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";
import { AnimatePresence } from "motion/react";
import { useMenuScroll } from "@/app/hooks/client/useMenuScroll";

const MenuProduct = () => {
  const { categories, selectedCategory, setSelectedCategory } = CategoryHook();
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    selectedToppings,
    setSelectedToppings,
    resetSelect,
  } = ProductHook();

  const { handleChildCategoryClick } = useMenuScroll(
    categories,
    setSelectedCategory,
    products,
  );
  return (
    <div className="px-3 py-2 mt-6">
      <div className="flex flex-col">
        {/* TITLE */}
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-medium">Danh sách sản phẩm</h1>
        </div>
        {/* CATEGORY + PRODUCT */}

        {categories.map((category) => {
          const children = category.children || [];
          const category_child = children.map((child) => child.category_id);
          const filteredProducts = products.filter((product) =>
            category_child.includes(product.category?.category_id || 0),
          );

          return (
            <section
              key={category.category_id}
              id={category.category_slug}
              className="scroll-mt-32"
            >
              <div className="flex gap-8">
                <div className="w-1/4">
                  <CategoryList
                    categories={category}
                    childItems={children}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    handleChildCategoryClick={handleChildCategoryClick}
                  />
                </div>
                <div className="w-3/4 pt-2">
                  <ProductList
                    products={filteredProducts}
                    childItems={children}
                    setSelectedProduct={setSelectedProduct}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => resetSelect()}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedToppings={selectedToppings}
            setSelectedToppings={setSelectedToppings}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuProduct;
