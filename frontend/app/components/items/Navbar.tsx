"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import ProfileButton from "./ProfileButton";
import { NavbarHook } from "@/app/hooks/NavbarHook";
import { ShoppingCartIcon } from "lucide-react";
import Cart from "./Cart/Cart";

const Navbar = () => {
  const {
    handleOpenLogin,
    handleCloseLogin,
    handleOpenRegister,
    handleCloseRegister,
    handleCategoryClick,
    isOpenLogin,
    isOpenRegister,
    isAuthenticated,
    user,
    logout,
    categories,
    isMounted,

    // Cart
    isOpenCart,
    handleOpenCart,
    handleCloseCart,
    totalItemsInCart,
  } = NavbarHook();

  return (
    <div className="sticky top-0 inset-x-0 px-3 py-1 border-b rounded-b-lg border-foreground bg-primary-lighter/70 shadow-xl z-50">
      <div className="flex justify-between items-center">
        {/* Right */}
        <Link href="/" className="px-2 py-1">
          <h1 className="text-lg font-semibold">Cypher_Cafe</h1>
        </Link>
        {/* Middle */}
        <div className="flex gap-6">
          {categories.map((category) => (
            <span
              key={category.category_id}
              // Thêm relative và group vào class
              className="relative group font-medium text-md cursor-pointer hover:text-secondary-foreground transition-colors duration-300"
              onClick={() => handleCategoryClick(category)}
            >
              {category.category_name}
              {/* Thêm thẻ span này để làm đường gạch chân */}
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 bg-secondary-foreground transition-all duration-300 group-hover:w-full"></span>
            </span>
          ))}
        </div>
        {/* Left */}
        <div>
          {!isMounted ? (
            <div /> // Skeleton lúc đang load
          ) : isAuthenticated && user ? (
            <div className="flex items-center justify-center gap-4">
              {/* Vùng chứa Icon giỏ hàng có position relative */}
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                <ShoppingCartIcon
                  width={24}
                  height={24}
                  className="text-foreground"
                  onClick={handleOpenCart}
                />
                {/* Chấm tròn hiển thị số lượng (Badge) */}
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
                  {totalItemsInCart}
                </span>
              </div>
              <ProfileButton user={user} logOut={logout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={handleOpenLogin}>Đăng nhập</Button>
              <Button onClick={handleOpenRegister}>Đăng ký</Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpenLogin && (
          <FormLogin
            onClose={handleCloseLogin}
            onOpenRegister={handleOpenRegister}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpenRegister && (
          <FormRegister
            onClose={handleCloseRegister}
            onOpenLogin={handleOpenLogin}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenCart && (
          <Cart
            onClose={handleCloseCart}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
