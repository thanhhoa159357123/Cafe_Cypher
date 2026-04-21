import { Suspense } from "react";
import Feature from "./components/items/Feature";
import MenuProduct from "./components/items/MenuProduct/MenuProduct";

export default function Home() {
  return (
    <div>
      <Feature />
      {/* Bọc Suspense riêng cho MenuProduct để nó không làm sập cả trang khi build */}
      <Suspense
        fallback={
          <div className="py-10 text-center">
            <p className="text-muted-foreground animate-pulse">
              Đang tải menu cà phê...
            </p>
          </div>
        }
      >
        <MenuProduct />
      </Suspense>
    </div>
  );
}
