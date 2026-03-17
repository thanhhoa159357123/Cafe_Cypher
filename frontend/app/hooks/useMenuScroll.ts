import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useMenuScroll = (categories: any, setSelectedCategory: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isClickingRef = useRef(false);
  const activeSlugRef = useRef<string | null>("");
  // 🚀 THÊM CÁI NÀY: Để nhớ cái mã bấm lần trước
  const lastTimeRef = useRef<string | null>(null);

  const handleChildCategoryClick = (parentSlug: string, childSlug: string) => {
    isClickingRef.current = true;
    activeSlugRef.current = childSlug;

    const params = new URLSearchParams(searchParams.toString());
    params.set("parent_categories", parentSlug);
    params.set("child_categories", childSlug);
    params.set("t", Date.now().toString()); // 🚀 Gắn mã t từ Sidebar

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
      lastTimeRef.current = t;
      isClickingRef.current = true;

      const targetSlug = childSlug || parentSlug;

      // 🚀 BƯỚC QUAN TRỌNG: Tìm cái Category object tương ứng với cái Slug trên URL
      for (const parent of categories) {
        // Tìm trong đám con của parent hiện tại
        const targetCategory = parent.children?.find(
          (c: any) => c.category_slug === targetSlug,
        );

        if (targetCategory) {
          // Set State ngay lập tức để CSS bên CategoryList sáng đèn lên
          setSelectedCategory(targetCategory);
          activeSlugRef.current = targetSlug; // Cập nhật bộ nhớ đệm luôn
          break;
        }
      }

      const element = document.getElementById(targetSlug || "");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            isClickingRef.current = false;
          }, 800);
        }, 100);
      }
    }
  }, [searchParams, categories, setSelectedCategory]); // Thêm setSelectedCategory vào dependency

  // --- EFFECT 2: ĐIỆP VIÊN SCROLL SPY ---
  useEffect(() => {
    if (categories.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return; // Đang bấm nút trượt thì Điệp viên nhắm mắt

      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      const entry = visibleEntries[0];
      const activeSlug = entry.target.id;

      if (activeSlugRef.current === activeSlug) return;

      for (const parent of categories) {
        const child = parent.children?.find(
          (c: any) => c.category_slug === activeSlug,
        );

        if (child) {
          activeSlugRef.current = activeSlug;
          setSelectedCategory(child);

          const params = new URLSearchParams(window.location.search);
          params.set("parent_categories", parent.category_slug);
          params.set("child_categories", child.category_slug);
          // 🚀 ĐIỆP VIÊN XÓA MÃ 't' ĐI ĐỂ EFFECT 1 KHÔNG BỊ LỪA
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

    categories.forEach((parent: any) => {
      parent.children?.forEach((child: any) => {
        const el = document.getElementById(child.category_slug);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [categories, pathname, setSelectedCategory]);

  return { handleChildCategoryClick };
};
