import { MainLayout } from "@/components/layout/main-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { TopProducts } from "@/components/dashboard/top-products"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { GoalsProgress } from "@/components/dashboard/goals-progress"
import { SalesFunnel } from "@/components/dashboard/sales-funnel"
import { Button } from "@/components/ui/button"
import { Fab } from "@/components/ui/fab"
import { DollarSign, ShoppingCart, TrendingUp, Users, Plus, Filter, Download, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard de Vendas</h2>
            <p className="text-muted-foreground">Acompanhe suas métricas e performance em tempo real</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Receita Total"
            value="R$ 124.500"
            change="+12% vs mês anterior"
            changeType="positive"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatsCard
            title="Vendas Realizadas"
            value="234"
            change="+8% vs mês anterior"
            changeType="positive"
            icon={<ShoppingCart className="h-4 w-4" />}
          />
          <StatsCard
            title="Novos Clientes"
            value="89"
            change="+23% vs mês anterior"
            changeType="positive"
            icon={<Users className="h-4 w-4" />}
          />
          <StatsCard
            title="Taxa de Conversão"
            value="68.5%"
            change="-2.1% vs mês anterior"
            changeType="negative"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        {/* Main Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <RevenueChart />
          </div>
        </div>

        {/* Secondary Widgets */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TopProducts />
          <GoalsProgress />
          <SalesFunnel />
        </div>

        {/* Recent Activities */}
        <RecentActivities />

        {/* Floating Action Button */}
        <Fab className="fixed bottom-6 right-6" size="default">
          <Plus className="h-6 w-6" />
        </Fab>
      </div>
    </MainLayout>
  )
}
