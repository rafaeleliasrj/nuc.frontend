"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { SalesTable } from "@/components/sales/sales-table"
import { SalesFilters } from "@/components/sales/sales-filters"
import { NewSaleModal } from "@/components/sales/new-sale-modal"
import { Button } from "@/components/ui/button"
import { Fab } from "@/components/ui/fab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Filter, BarChart3 } from "lucide-react"

export default function SalesPage() {
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  return (
    <MainLayout title="Vendas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Gestão de Vendas</h2>
            <p className="text-muted-foreground">Gerencie todas as suas vendas e oportunidades</p>
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
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Relatório
            </Button>
            <Button onClick={() => setIsNewSaleModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Venda
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Total de Vendas</CardDescription>
              <CardTitle className="text-2xl">1.234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Receita Total</CardDescription>
              <CardTitle className="text-2xl">R$ 456.789</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+8% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Ticket Médio</CardDescription>
              <CardTitle className="text-2xl">R$ 1.250</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">-3% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Taxa de Conversão</CardDescription>
              <CardTitle className="text-2xl">68%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+5% este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        {showFilters && <SalesFilters />}

        {/* Sales Table */}
        <SalesTable />

        {/* Floating Action Button */}
        <Fab className="fixed bottom-6 right-6" onClick={() => setIsNewSaleModalOpen(true)}>
          <Plus className="h-6 w-6" />
        </Fab>

        {/* New Sale Modal */}
        <NewSaleModal open={isNewSaleModalOpen} onOpenChange={setIsNewSaleModalOpen} />
      </div>
    </MainLayout>
  )
}
