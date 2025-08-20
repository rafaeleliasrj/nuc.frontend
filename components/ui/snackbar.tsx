"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const snackbarVariants = cva(
  "fixed bottom-4 left-1/2 z-50 flex min-w-[344px] max-w-[672px] -translate-x-1/2 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all elevation-3",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        success: "bg-green-600 text-white",
        error: "bg-destructive text-destructive-foreground",
        warning: "bg-yellow-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof snackbarVariants> {
  action?: React.ReactNode
  onClose?: () => void
  autoHideDuration?: number
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, variant, action, onClose, autoHideDuration = 4000, children, ...props }, ref) => {
    React.useEffect(() => {
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          onClose?.()
        }, autoHideDuration)
        return () => clearTimeout(timer)
      }
    }, [autoHideDuration, onClose])

    return (
      <div className={cn(snackbarVariants({ variant, className }))} ref={ref} {...props}>
        <div className="flex-1">{children}</div>
        {action && <div className="flex items-center">{action}</div>}
        {onClose && (
          <button onClick={onClose} className="rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
Snackbar.displayName = "Snackbar"

export { Snackbar, snackbarVariants }
