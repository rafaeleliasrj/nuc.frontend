import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-primary text-primary-foreground elevation-2",
          sizeClasses[size],
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-1/2 h-1/2"
        >
          {/* Growth bars representing efficiency and progress */}
          <path d="M3 17h4v4H3z" />
          <path d="M9 12h4v9H9z" />
          <path d="M15 7h4v14h-4z" />
          {/* Arrow showing upward trend */}
          <path d="M4 6l6-2 6 2 4-2" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-foreground leading-none tracking-tight", textSizeClasses[size])}>
            GestãoFácil
          </span>
          {size !== "sm" && <span className="text-xs text-muted-foreground font-medium">Sistema de Gestão</span>}
        </div>
      )}
    </div>
  )
}
