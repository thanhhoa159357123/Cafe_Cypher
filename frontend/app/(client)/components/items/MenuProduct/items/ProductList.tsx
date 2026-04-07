import { ICategory } from "@/app/types/base/category";
import { IProduct } from "@/app/types/base/product";
import Image from "next/image";

interface ProductListProps {
  products: IProduct[];
  childItems: ICategory[];
  setSelectedProduct: (product: IProduct | null) => void;
}

const ProductList = ({
  products,
  childItems,
  setSelectedProduct,
}: ProductListProps) => {
  if (products.length === 0) {
    return <p>Sản phẩm sắp được lên kệ.</p>;
  }

  return (
    <div className="px-2 py-1">
      {childItems.map((child) => {
        const filteredProducts = products.filter(
          (p) => p.category?.id === child.id,
        );
        return (
          <div
            key={child.id}
            id={child.slug}
            className="flex flex-col mb-6 gap-4 scroll-mt-32"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {child.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="p-4">
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={product.image ?? "/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-lg font-medium text-gray-800 line-clamp-2">
                        {product.name}
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
