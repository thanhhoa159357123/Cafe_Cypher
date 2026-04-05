import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "../../types/category";
import { IProduct } from "../../types/product";

export const useMenuScroll = (
  categories: ICategory[],
  setSelectedCategory: (category: ICategory | null) => void,
  products: IProduct[],
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isClickingRef = useRef(false);
  const activeSlugRef = useRef<string | null>("");
  const lastTimeRef = useRef<string | null>(null);

  const handleChildCategoryClick = (parentSlug: string, childSlug: string) => {
    isClickingRef.current = true;
    activeSlugRef.current = childSlug;

    const params = new URLSearchParams(searchParams.toString());
    params.set("parent_categories", parentSlug);
    params.set("child_categories", childSlug);
    params.set("t", Date.now().toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  // --- EFFECT 1: CHỈ TRƯỢT KHI CÓ MÃ 't' ---
  useEffect(() => {
    const parentSlug = searchParams.get("parent_categories");
    const childSlug = searchParams.get("child_categories");
    const t = searchParams.get("t");

    if (!t || t === lastTimeRef.current) return;

    if (categories.length > 0 && (parentSlug || childSlug)) {
      isClickingRef.current = true;
      const targetSlug = childSlug || parentSlug;

      for (const parent of categories) {
        const targetCategory = parent.children?.find(
          (c: ICategory) => c.category_slug === targetSlug,
        );

        if (targetCategory) {
          setSelectedCategory(targetCategory);
          activeSlugRef.current = targetSlug;
          break;
        }
      }

      const element = document.getElementById(targetSlug || "");
      if (element) {
        lastTimeRef.current = t;
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isClickingRef.current = false;
          }, 800);
        }, 100);
      }
    }
  }, [searchParams, categories, products, setSelectedCategory]);

  // --- EFFECT 2: ĐIỆP VIÊN SCROLL SPY ---
  useEffect(() => {
    if (categories.length === 0 || products.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return;

      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      const entry = visibleEntries[0];
      const activeSlug = entry.target.id;

      if (activeSlugRef.current === activeSlug) return;

      for (const parent of categories) {
        const child = parent.children?.find(
          (c: ICategory) => c.category_slug === activeSlug,
        );

        if (child) {
          activeSlugRef.current = activeSlug;
          setSelectedCategory(child);

          const params = new URLSearchParams(window.location.search);
          params.set("parent_categories", parent.category_slug);
          params.set("child_categories", child.category_slug);
          params.delete("t");

          window.history.replaceState(
            null,
            "",
            `${pathname}?${params.toString()}`,
          );
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-120px 0px -75% 0px",
      threshold: 0,
    });

    categories.forEach((parent: ICategory) => {
      parent.children?.forEach((child: ICategory) => {
        const el = document.getElementById(child.category_slug);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [categories, products, pathname, setSelectedCategory]);

  // --- EFFECT 3: DỌN DẸP URL KHI CUỘN LÊN ĐẦU TRANG (DÙNG OBSERVER) ---
  useEffect(() => {
    // Đợi UI render xong mới tìm cái Banner
    const heroElement = document.getElementById("hero-section");
    if (!heroElement) return;

    const handleHeroIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      // Nếu người dùng cuộn lên và nhìn thấy Banner (không phải đang bấm Navbar tự trượt)
      if (entry.isIntersecting && !isClickingRef.current) {
        if (activeSlugRef.current !== null) {
          activeSlugRef.current = null; // Reset bộ nhớ
          setSelectedCategory(null); // Tắt highlight chữ ở Menu trái

          // Kiểm tra URL hiện tại xem có rác (params) không, có thì dọn
          const params = new URLSearchParams(window.location.search);
          if (
            params.has("parent_categories") ||
            params.has("child_categories")
          ) {
            window.history.replaceState(null, "", pathname);
          }
        }
      }
    };

    // Cài đặt "Mắt thần" cho cái Banner
    const heroObserver = new IntersectionObserver(handleHeroIntersect, {
      threshold: 0.1, // Cứ thấy thò ra khoảng 10% cái ảnh là kích hoạt dọn dẹp
      rootMargin: "-80px 0px 0px 0px", // Trừ đi khoảng không gian của thanh Navbar dính ở trên cùng
    });

    heroObserver.observe(heroElement);

    // Rút mắt thần khi component bị hủy
    return () => heroObserver.disconnect();
  }, [pathname, setSelectedCategory]);

  return { handleChildCategoryClick };
};
