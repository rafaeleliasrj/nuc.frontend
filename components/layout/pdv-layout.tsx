"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

interface PDVLayoutProps {
  children: React.ReactNode
  onCancel?: () => void
  showCancelButton?: boolean
}

export function PDVLayout({ children, onCancel, showCancelButton = true }: PDVLayoutProps) {
  const router = useRouter()

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.push("/")
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        {/* PDV Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="sm" showText />
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">PDV - Ponto de Venda</h1>
            </div>

            {showCancelButton && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* PDV Content */}
        <main className="h-[calc(100vh-80px)] overflow-hidden">{children}</main>
      </div>
    </ThemeProvider>
  )
}
