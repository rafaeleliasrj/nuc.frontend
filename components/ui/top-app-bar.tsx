import * as React from "react"
import { cn } from "@/lib/utils"

interface TopAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  variant?: "small" | "center-aligned" | "medium" | "large"
}

const TopAppBar = React.forwardRef<HTMLDivElement, TopAppBarProps>(
  ({ className, title, leading, trailing, variant = "small", ...props }, ref) => {
    const heights = {
      small: "h-16",
      "center-aligned": "h-16",
      medium: "h-28",
      large: "h-40",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-center bg-surface-container px-4 elevation-1",
          heights[variant],
          variant === "center-aligned" && "justify-center",
          className,
        )}
        {...props}
      >
        {leading && <div className="flex items-center">{leading}</div>}

        {title && (
          <h1
            className={cn(
              "font-medium text-foreground",
              variant === "small" && "ml-4 text-xl",
              variant === "center-aligned" && "text-xl",
              variant === "medium" && "ml-4 text-2xl",
              variant === "large" && "ml-4 text-3xl",
            )}
          >
            {title}
          </h1>
        )}

        <div className="flex-1" />

        {trailing && <div className="flex items-center gap-2">{trailing}</div>}
      </div>
    )
  },
)
TopAppBar.displayName = "TopAppBar"

export { TopAppBar }
