import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-primary/50 bg-primary/10 text-primary shadow-[0_0_10px_rgba(0,240,255,0.2)]",
        secondary:
          "border-secondary-foreground/30 bg-secondary text-secondary-foreground",
        destructive:
          "border-destructive/50 bg-destructive/10 text-destructive shadow-[0_0_10px_rgba(255,0,0,0.2)]",
        outline: "text-foreground border-border",
        live: "border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)] animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
