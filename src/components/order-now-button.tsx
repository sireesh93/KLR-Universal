import { ShoppingBag } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { ORDER_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"

type OrderNowButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string
  label?: string
}

/**
 * Every "Order Now" CTA on the marketing site redirects here, to the
 * order management system's own subdomain.
 */
export function OrderNowButton({
  className,
  variant = "default",
  size = "lg",
  label = "Order Now",
}: OrderNowButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      nativeButton={false}
      className={cn("h-12 rounded-full px-7 text-base font-bold", className)}
      render={
        <a href={ORDER_URL}>
          <ShoppingBag data-icon="inline-start" className="size-4.5" />
          {label}
        </a>
      }
    />
  )
}
