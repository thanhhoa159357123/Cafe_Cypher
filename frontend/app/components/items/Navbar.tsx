"use client";

import { CategoryHook } from "@/app/hooks/CategoryHook";
import { Button } from "../ui/button";
import { ICategory } from "@/app/types/category";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import FormLogin from "./FormLogin";
import { useEffect, useState } from "react";
import FormRegister from "./FormRegister";
import { useAuthStore } from "@/app/store/useAuthStore";
import ProfileButton from "./ProfileButton";
import { NavbarHook } from "@/app/hooks/NavbarHook";

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
              className="font-medium text-md cursor-pointer hover:text-secondary-foreground transition-colors duration-300"
              onClick={() => handleCategoryClick(category)}
            >
              {category.category_name}
            </span>
          ))}
        </div>
        {/* Left */}
        <div>
          {!isMounted ? (
            <div /> // Skeleton lúc đang load
          ) : isAuthenticated && user ? (
            <ProfileButton user={user} logOut={logout} />
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
    </div>
  );
};

export default Navbar;
