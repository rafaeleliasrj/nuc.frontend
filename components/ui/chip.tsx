"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground",
        primary: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20",
        outline: "border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  onRemove?: () => void
  removable?: boolean
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, onRemove, removable = false, children, ...props }, ref) => {
    return (
      <div className={cn(chipVariants({ variant, className }))} ref={ref} {...props}>
        {children}
        {removable && (
          <button onClick={onRemove} className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  },
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
