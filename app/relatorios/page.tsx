"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { SalesPerformanceChart } from "@/components/reports/sales-performance-chart"
import { TeamPerformanceChart } from "@/components/reports/team-performance-chart"
import { ProductAnalytics } from "@/components/reports/product-analytics"
import { CustomerSegmentation } from "@/components/reports/customer-segmentation"
import { RevenueAnalytics } from "@/components/reports/revenue-analytics"
import { ConversionFunnel } from "@/components/reports/conversion-funnel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, TrendingUp, Users, Package, DollarSign, BarChart3, PieChart } from "lucide-react"

export default function ReportsPage() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <MainLayout title="Relatórios">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Relatórios e Analytics</h2>
            <p className="text-muted-foreground">Análises detalhadas de performance e insights de negócio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Dashboard Executivo
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Receita Total</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                R$ 1.2M
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">+18% vs período anterior</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Vendas Realizadas</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                2.456
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-blue-600">+12% vs período anterior</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Novos Clientes</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                345
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-purple-600">+25% vs período anterior</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Produtos Vendidos</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-600" />
                3.789
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-orange-600">+8% vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        {showFilters && <ReportsFilters />}

        {/* Reports Tabs */}
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="sales" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Vendas
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2">
              <PieChart className="h-4 w-4" />
              Receita
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <SalesPerformanceChart />
              <ConversionFunnel />
            </div>
            <RevenueAnalytics />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <CustomerSegmentation />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductAnalytics />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamPerformanceChart />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <RevenueAnalytics />
              <SalesPerformanceChart />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
