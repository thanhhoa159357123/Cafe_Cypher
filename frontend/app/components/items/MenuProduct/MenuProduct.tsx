'use client'

import { CategoryHook } from '@/app/hooks/CategoryHook'
import { ProductHook } from '@/app/hooks/ProductHook'
import CategoryList from './items/CategoryList'
import ProductList from './items/ProductList'
import ProductDetail from '../ProductDetail/ProductDetail'
import { AnimatePresence } from 'motion/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

const MenuProduct = () => {
  const { categories, selectedCategory, setSelectedCategory } = CategoryHook()
  const { products, selectedProduct, setSelectedProduct } = ProductHook()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  // 🚀 1. TẠO CÔNG TẮC: Mặc định là true để lần đầu vào web nó tự trượt
  const isClickingRef = useRef(true)
  // 🚀 THÊM CÁI NÀY: Bộ nhớ đệm tàng hình giúp Điệp viên không bị "mất trí nhớ"
  const activeSlugRef = useRef('')
  // ? Hàm để xử lý khi click vào danh mục con, cập nhật URL với slug của danh mục cha và con
  const handleChildCategoryClick = (parentSlug: string, childSlug: string) => {
    // 🚀 2. KHI CLICK: Bật công tắc lên
    isClickingRef.current = true
    activeSlugRef.current = childSlug

    const params = new URLSearchParams(searchParams.toString())
    params.set('parent_categories', parentSlug)
    params.set('child_categories', childSlug)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })

    // Tắt công tắc sau 1 giây (đợi trượt xong)
    setTimeout(() => {
      isClickingRef.current = false
    }, 1000)
  }

  // --- EFFECT 1: LẮNG NGHE URL ĐỂ TRƯỢT MÀN HÌNH ---
  useEffect(() => {
    // 🚀 3. NẾU ĐANG CUỘN TAY (!isClickingRef.current) THÌ KHÔNG ĐƯỢC CHẠY LỆNH TRƯỢT
    if (!isClickingRef.current) return

    const parentSlug = searchParams.get('parent_categories')
    const childSlug = searchParams.get('child_categories')

    if (categories.length > 0) {
      const targetSlug = childSlug || parentSlug
      const element = document.getElementById(targetSlug || '')

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })

          // Sau khi load trang lần đầu và trượt xong, tắt công tắc đi
          setTimeout(() => {
            isClickingRef.current = false
          }, 500)
        }, 100)
      }
    }
  }, [searchParams, categories])

  // --- EFFECT 2: ĐIỆP VIÊN SCROLL SPY (FIX LỖI NHÁY CSS) ---
  useEffect(() => {
    if (categories.length === 0) return

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return

      // Lọc ra NHỮNG THẰNG ĐANG HIỆN TRÊN MÀN HÌNH (tránh lỗi lấy nhầm thằng vừa bị cuộn qua)
      const visibleEntries = entries.filter((e) => e.isIntersecting)
      if (visibleEntries.length === 0) return

      // Nếu người dùng cuộn nhanh quá khiến 2-3 thằng cùng hiện, ta ưu tiên thằng đầu tiên
      const entry = visibleEntries[0]
      const activeSlug = entry.target.id

      // 🚀 CHỐT CHẶN TỐI THƯỢNG: Nếu danh mục chuẩn bị đổi GIỐNG HỆT danh mục hiện tại -> Dừng luôn!
      if (activeSlugRef.current === activeSlug) return

      for (const parent of categories) {
        const child = parent.children?.find(
          (c) => c.category_slug === activeSlug,
        )

        if (child) {
          activeSlugRef.current = activeSlug // Cập nhật bộ nhớ đệm
          setSelectedCategory(child) // Gọi React đổi màu CSS

          const params = new URLSearchParams(window.location.search)
          params.set('parent_categories', parent.category_slug)
          params.set('child_categories', child.category_slug)
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          )
          break
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-120px 0px -75% 0px',
      threshold: 0,
    })

    categories.forEach((parent) => {
      parent.children?.forEach((child) => {
        const el = document.getElementById(child.category_slug)
        if (el) observer.observe(el)
      })
    })

    return () => observer.disconnect()
    // 🚀 QUAN TRỌNG NHẤT: Đã tháo cái quả bom selectedCategory ra khỏi đây!
  }, [categories, pathname, setSelectedCategory])

  return (
    <div className="px-3 py-2">
      <div className="flex flex-col">
        {/* TITLE */}
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-medium">Danh sách sản phẩm</h1>
        </div>
        {/* CATEGORY + PRODUCT */}

        {categories.map((category) => {
          const children = category.children || []
          const category_child = children.map((child) => child.category_id)
          const filteredProducts = products.filter((product) =>
            category_child.includes(product.category?.category_id || 0),
          )

          return (
            <section
              key={category.category_id}
              id={category.category_slug}
              className="scroll-mt-20"
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
                <div className="w-3/4">
                  <ProductList
                    products={filteredProducts}
                    childItems={children}
                    setSelectedProduct={setSelectedProduct}
                  />
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MenuProduct
