"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { SalesPerformanceChart } from "@/components/reports/sales-performance-chart"
import { TeamPerformanceChart } from "@/components/reports/team-performance-chart"
import { ProductAnalytics } from "@/components/reports/product-analytics"
import { CustomerSegmentation } from "@/components/reports/customer-segmentation"
import { RevenueAnalytics } from "@/components/reports/revenue-analytics"
import { ConversionFunnel } from "@/components/reports/conversion-funnel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Target, Download, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <MainLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Analytics Avançado</h2>
            <p className="text-muted-foreground">Insights profundos e análises preditivas do seu negócio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="elevation-1">
          <CardHeader>
            <CardTitle>Resumo Executivo</CardTitle>
            <CardDescription>Principais indicadores de performance do negócio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Receita Anual</span>
                </div>
                <div className="text-2xl font-bold">R$ 1.593.000</div>
                <Badge variant="default" className="text-xs">
                  +18% YoY
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Base de Clientes</span>
                </div>
                <div className="text-2xl font-bold">1.234</div>
                <Badge variant="default" className="text-xs">
                  +15% crescimento
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Taxa de Conversão</span>
                </div>
                <div className="text-2xl font-bold">68%</div>
                <Badge variant="secondary" className="text-xs">
                  -2% vs meta
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">LTV/CAC Ratio</span>
                </div>
                <div className="text-2xl font-bold">8.5x</div>
                <Badge variant="default" className="text-xs">
                  Excelente
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesPerformanceChart />
          <ConversionFunnel />
        </div>

        <RevenueAnalytics />
        <CustomerSegmentation />
        <ProductAnalytics />
        <TeamPerformanceChart />
      </div>
    </MainLayout>
  )
}
