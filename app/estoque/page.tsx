"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Package,
  ArrowUpDown,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  DollarSign,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StockMovementModal } from "@/components/estoque/stock-movement-modal"
import { StockAdjustmentModal } from "@/components/estoque/stock-adjustment-modal"
import { ProductStockModal } from "@/components/estoque/product-stock-modal"

interface StockItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unitCost: number
  totalValue: number
  lastMovement: string
  status: "normal" | "low" | "critical" | "excess"
  location: string
}

interface StockMovement {
  id: string
  productId: string
  productName: string
  type: "entrada" | "saida" | "ajuste" | "transferencia"
  quantity: number
  reason: string
  date: string
  user: string
  reference?: string
}

const mockStockItems: StockItem[] = [
  {
    id: "1",
    name: "Camiseta Básica Branca",
    sku: "CAM-001",
    category: "Roupas",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitCost: 25.0,
    totalValue: 1125.0,
    lastMovement: "2024-01-20",
    status: "normal",
    location: "A1-B2",
  },
  {
    id: "2",
    name: "Calça Jeans Masculina",
    sku: "CAL-002",
    category: "Roupas",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unitCost: 89.9,
    totalValue: 719.2,
    lastMovement: "2024-01-19",
    status: "low",
    location: "B1-C3",
  },
  {
    id: "3",
    name: "Tênis Esportivo",
    sku: "TEN-003",
    category: "Calçados",
    currentStock: 3,
    minStock: 10,
    maxStock: 30,
    unitCost: 159.9,
    totalValue: 479.7,
    lastMovement: "2024-01-18",
    status: "critical",
    location: "C1-A1",
  },
  {
    id: "4",
    name: "Mochila Escolar",
    sku: "MOC-004",
    category: "Acessórios",
    currentStock: 85,
    minStock: 20,
    maxStock: 60,
    unitCost: 45.0,
    totalValue: 3825.0,
    lastMovement: "2024-01-17",
    status: "excess",
    location: "D1-B2",
  },
]

const mockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Camiseta Básica Branca",
    type: "entrada",
    quantity: 50,
    reason: "Compra - Fornecedor ABC",
    date: "2024-01-20 14:30",
    user: "Ana Silva",
    reference: "NF-001234",
  },
  {
    id: "2",
    productId: "2",
    productName: "Calça Jeans Masculina",
    type: "saida",
    quantity: -12,
    reason: "Venda - PDV",
    date: "2024-01-19 16:45",
    user: "Carlos Santos",
    reference: "VND-005678",
  },
  {
    id: "3",
    productId: "3",
    productName: "Tênis Esportivo",
    type: "ajuste",
    quantity: -2,
    reason: "Ajuste de inventário - Produto danificado",
    date: "2024-01-18 10:15",
    user: "Maria Oliveira",
  },
]

export default function EstoquePage() {
  const [stockItems, setStockItems] = useState<StockItem[]>(mockStockItems)
  const [movements, setMovements] = useState<StockMovement[]>(mockMovements)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showMovementModal, setShowMovementModal] = useState(false)
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null)

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: StockItem["status"]) => {
    const variants = {
      normal: "default",
      low: "secondary",
      critical: "destructive",
      excess: "outline",
    } as const

    const labels = {
      normal: "Normal",
      low: "Baixo",
      critical: "Crítico",
      excess: "Excesso",
    }

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    )
  }

  const getMovementIcon = (type: StockMovement["type"]) => {
    switch (type) {
      case "entrada":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "saida":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "ajuste":
        return <ArrowUpDown className="h-4 w-4 text-blue-600" />
      case "transferencia":
        return <Package className="h-4 w-4 text-purple-600" />
    }
  }

  const totalValue = stockItems.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = stockItems.filter((item) => item.status === "low" || item.status === "critical").length
  const criticalItems = stockItems.filter((item) => item.status === "critical").length

  return (
    <MainLayout title="Controle de Estoque">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
            <p className="text-gray-600">Gerencie o estoque de produtos e movimentações</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAdjustmentModal(true)}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Ajuste
            </Button>
            <Button onClick={() => setShowMovementModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Movimentação
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total de Itens</p>
                  <p className="text-2xl font-bold text-gray-900">{stockItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {totalValue.toLocaleString("pt-BR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Crítico</p>
                  <p className="text-2xl font-bold text-gray-900">{criticalItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="produtos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="produtos">Produtos em Estoque</TabsTrigger>
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
          </TabsList>

          <TabsContent value="produtos" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Buscar por nome ou SKU..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Baixo</SelectItem>
                      <SelectItem value="critical">Crítico</SelectItem>
                      <SelectItem value="excess">Excesso</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      <SelectItem value="Roupas">Roupas</SelectItem>
                      <SelectItem value="Calçados">Calçados</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Estoque Atual</TableHead>
                      <TableHead>Min/Max</TableHead>
                      <TableHead>Valor Unit.</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="font-mono">{item.currentStock}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {item.minStock} / {item.maxStock}
                        </TableCell>
                        <TableCell>R$ {item.unitCost.toFixed(2)}</TableCell>
                        <TableCell>R$ {item.totalValue.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedProduct(item)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                Ajustar Estoque
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movimentacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Movimentações</CardTitle>
                <CardDescription>Histórico de entradas, saídas e ajustes de estoque</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Referência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            <span className="capitalize">{movement.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{movement.productName}</TableCell>
                        <TableCell className={`font-mono ${movement.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </TableCell>
                        <TableCell>{movement.reason}</TableCell>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>{movement.user}</TableCell>
                        <TableCell>{movement.reference || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-4">
            <div className="grid gap-4">
              {stockItems
                .filter((item) => item.status === "low" || item.status === "critical")
                .map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Estoque atual: {item.currentStock} | Mínimo: {item.minStock}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          <Button size="sm">Repor Estoque</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <StockMovementModal
        open={showMovementModal}
        onClose={() => setShowMovementModal(false)}
        onMovementCreated={(movement) => {
          setMovements((prev) => [{ ...movement, id: Date.now().toString() }, ...prev])
          setShowMovementModal(false)
        }}
      />

      <StockAdjustmentModal
        open={showAdjustmentModal}
        onClose={() => setShowAdjustmentModal(false)}
        onAdjustmentCreated={(adjustment) => {
          setMovements((prev) => [{ ...adjustment, id: Date.now().toString() }, ...prev])
          setShowAdjustmentModal(false)
        }}
      />

      {selectedProduct && (
        <ProductStockModal
          open={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </MainLayout>
  )
}
