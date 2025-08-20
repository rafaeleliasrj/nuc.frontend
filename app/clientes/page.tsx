"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { ClientsGrid } from "@/components/clients/clients-grid"
import { ClientsFilters } from "@/components/clients/clients-filters"
import { NewClientModal } from "@/components/clients/new-client-modal"
import { Button } from "@/components/ui/button"
import { Fab } from "@/components/ui/fab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Filter, Users, UserPlus, Star, TrendingUp } from "lucide-react"

export default function ClientsPage() {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <MainLayout title="Clientes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Gestão de Clientes</h2>
            <p className="text-muted-foreground">Gerencie seu relacionamento com clientes e prospects</p>
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
            <Button onClick={() => setIsNewClientModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Total de Clientes</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                1.234
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+15% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Novos Clientes</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-green-600" />
                89
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+23% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>Clientes VIP</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-600" />
                45
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+8% este mês</p>
            </CardContent>
          </Card>
          <Card className="elevation-1">
            <CardHeader className="pb-2">
              <CardDescription>LTV Médio</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                R$ 5.2K
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        {showFilters && <ClientsFilters />}

        {/* Clients Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos (1.234)</TabsTrigger>
            <TabsTrigger value="active">Ativos (987)</TabsTrigger>
            <TabsTrigger value="prospects">Prospects (156)</TabsTrigger>
            <TabsTrigger value="vip">VIP (45)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <ClientsGrid />
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <ClientsGrid />
          </TabsContent>
          <TabsContent value="prospects" className="space-y-4">
            <ClientsGrid />
          </TabsContent>
          <TabsContent value="vip" className="space-y-4">
            <ClientsGrid />
          </TabsContent>
        </Tabs>

        {/* Floating Action Button */}
        <Fab className="fixed bottom-6 right-6" onClick={() => setIsNewClientModalOpen(true)}>
          <Plus className="h-6 w-6" />
        </Fab>

        {/* New Client Modal */}
        <NewClientModal open={isNewClientModalOpen} onOpenChange={setIsNewClientModalOpen} />
      </div>
    </MainLayout>
  )
}
