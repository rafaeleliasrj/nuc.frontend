import * as React from "react"
import { cn } from "@/lib/utils"

interface NavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavigationRail = React.forwardRef<HTMLDivElement, NavigationRailProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-20 flex-col items-center gap-4 bg-surface-container-low py-6 elevation-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
NavigationRail.displayName = "NavigationRail"

interface NavigationRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label?: string
  active?: boolean
}

const NavigationRailItem = React.forwardRef<HTMLButtonElement, NavigationRailItemProps>(
  ({ className, icon, label, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition-colors",
          active
            ? "bg-secondary/20 text-secondary"
            : "text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="h-6 w-6">{icon}</div>
        {label && <span className="text-[10px]">{label}</span>}
      </button>
    )
  },
)
NavigationRailItem.displayName = "NavigationRailItem"

export { NavigationRail, NavigationRailItem }
