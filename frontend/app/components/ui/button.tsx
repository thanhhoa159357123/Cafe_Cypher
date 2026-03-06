import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils' // Hàm cn mình tạo lúc nãy đây!

// 1. Định nghĩa các "biến thể" (Variants) của Button
const buttonVariants = cva(
  // Class chung cho tất cả các loại nút
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer',
  {
    variants: {
      variant: {
        // Màu Nâu Cafe (Primary)
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md',
        // Màu Xanh Lá (Accent)
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md',
        // Nút có viền
        outline:
          'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        // Nút trong suốt
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// 2. Tạo Component Button
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
