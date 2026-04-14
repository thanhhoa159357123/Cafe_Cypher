import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/client/useAuthStore";
import { CategoryHook } from "./CategoryHook";
import { useEffect, useState } from "react";
import { ICategory } from "../../types/base/category";
import { CartHook } from "./CartHook";

export const NavbarHook = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { categories } = CategoryHook();
  const { cart } = CartHook();
  const router = useRouter();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const totalItemsInCart = cart?.items.length || 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenLogin = () => {
    setIsOpenLogin(true);
    setIsOpenRegister(false);
  };

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
  };

  const handleOpenRegister = () => {
    setIsOpenRegister(true);
    setIsOpenLogin(false);
  };

  const handleCloseRegister = () => {
    setIsOpenRegister(false);
  };

  const handleOpenCart = () => {
    setIsOpenCart(true);
  };

  const handleCloseCart = () => {
    setIsOpenCart(false);
  };

  const handleCategoryClick = (
    parentCategory: ICategory,
    childCategory?: ICategory,
  ) => {
    const selectChild = childCategory || parentCategory.children?.[0];

    // 🚀 THÊM &t=${Date.now()} VÀO 2 CÁI URL NÀY:
    if (selectChild) {
      router.push(
        `/?parent_categories=${parentCategory.slug}&child_categories=${selectChild.slug}&t=${Date.now()}`,
        { scroll: false },
      );
    } else {
      router.push(
        `/?parent_categories=${parentCategory.slug}&t=${Date.now()}`,
        {
          scroll: false,
        },
      );
    }
  };

  return {
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
  };
};
