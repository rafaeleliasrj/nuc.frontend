"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Settings,
  Home,
  FileText,
  Search,
  CreditCard,
  Building2,
  Receipt,
  Shield,
  Truck,
  Package,
  Warehouse,
  DollarSign,
  Zap,
  FileCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/ui/logo"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Vendas",
    href: "/vendas",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "PDV",
    href: "/pdv",
    icon: CreditCard,
  },
  {
    title: "Estoque",
    href: "/estoque",
    icon: Warehouse,
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Propostas",
    href: "/propostas",
    icon: FileText,
  },
]

const administracaoItems = [
  {
    title: "Usuários",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Permissões",
    href: "/admin/permissoes",
    icon: Shield,
  },
]

const cadastroItems = [
  {
    title: "Empresa",
    href: "/cadastros/empresa",
    icon: Building2,
  },
  {
    title: "Produtos",
    href: "/cadastros/produtos",
    icon: Package,
  },
  {
    title: "Fornecedores",
    href: "/cadastros/fornecedores",
    icon: Truck,
  },
  {
    title: "Nota Fiscal",
    href: "/cadastros/nota-fiscal",
    icon: Receipt,
  },
  {
    title: "Certificados",
    href: "/cadastros/certificados",
    icon: Shield,
  },
]

const integracaoItems = [
  {
    title: "Integrações",
    href: "/integracoes",
    icon: Zap,
  },
]

const fiscalItems = [
  {
    title: "NFC-e / NF-e",
    href: "/fiscal",
    icon: FileCheck,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border shadow-sm overflow-y-auto",
        className,
      )}
    >
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border flex-shrink-0">
        <Logo size="sm" />
      </div>

      {/* Search */}
      <div className="px-4 py-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-9 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 pb-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent/10 text-sidebar-accent hover:bg-sidebar-accent/20"
                    : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Button>
            </Link>
          )
        })}

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Fiscal</h3>
          {fiscalItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent/10 text-sidebar-accent hover:bg-sidebar-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Integrações
          </h3>
          {integracaoItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent/10 text-sidebar-accent hover:bg-sidebar-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Administration Section */}
        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Administração
          </h3>
          {administracaoItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent/10 text-sidebar-accent hover:bg-sidebar-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cadastros</h3>
          {cadastroItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent/10 text-sidebar-accent hover:bg-sidebar-accent/20"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <Link href="/configuracoes">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 px-3 rounded-xl font-medium text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
          >
            <Settings className="h-5 w-5" />
            Configurações
          </Button>
        </Link>
      </div>
    </div>
  )
}
