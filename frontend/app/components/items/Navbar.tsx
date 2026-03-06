'use client'

import { CategoryHook } from '@/app/hooks/CategoryHook'
import { Button } from '../ui/button'
import { ICategory } from '@/app/types/category'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const { categories } = CategoryHook()
  const router = useRouter()

  const handleCategoryClick = (
    parentCategory: ICategory,
    childCategory?: ICategory,
  ) => {
    const selectChild = childCategory || parentCategory.children?.[0]

    if (selectChild) {
      router.push(
        `/?parent_categories=${parentCategory.slug}&child_categories=${selectChild.slug}`,
        { scroll: false },
      )
    } else {
      router.push(`/?parent_categories=${parentCategory.slug}`, {
        scroll: false,
      })
    }
  }

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
              key={category.id}
              className="font-medium text-md cursor-pointer hover:text-secondary-foreground transition-colors duration-300"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name.toUpperCase()}
            </span>
          ))}
        </div>
        {/* Left */}
        <div className="flex items-center gap-2">
          <Button className="px-3 py-1">Đăng nhập</Button>
          <Button className="px-4 py-1">Đăng ký</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
