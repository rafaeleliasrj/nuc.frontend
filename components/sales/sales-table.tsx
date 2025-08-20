"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SaleDetailsModal } from "./sale-details-modal"
import { EditSaleModal } from "./edit-sale-modal"
import { Eye, Edit, Trash2, MoreHorizontal, Copy } from "lucide-react"

interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  status: "pending" | "completed" | "cancelled" | "processing"
  date: string
  salesperson: string
}

const salesData: Sale[] = [
  {
    id: "VND-001",
    customer: "Maria Silva",
    product: "Produto Premium A",
    amount: 2500,
    status: "completed",
    date: "2024-01-15",
    salesperson: "João Vendedor",
  },
  {
    id: "VND-002",
    customer: "Pedro Santos",
    product: "Serviço Consultoria",
    amount: 5000,
    status: "processing",
    date: "2024-01-14",
    salesperson: "Ana Gestora",
  },
  {
    id: "VND-003",
    customer: "Ana Costa",
    product: "Produto Standard B",
    amount: 1200,
    status: "pending",
    date: "2024-01-13",
    salesperson: "Carlos Vendedor",
  },
  {
    id: "VND-004",
    customer: "João Lima",
    product: "Pacote Enterprise",
    amount: 8500,
    status: "completed",
    date: "2024-01-12",
    salesperson: "João Vendedor",
  },
  {
    id: "VND-005",
    customer: "Carla Oliveira",
    product: "Produto Premium A",
    amount: 2500,
    status: "cancelled",
    date: "2024-01-11",
    salesperson: "Ana Gestora",
  },
]

const statusConfig = {
  pending: { label: "Pendente", variant: "secondary" as const },
  processing: { label: "Processando", variant: "default" as const },
  completed: { label: "Concluída", variant: "default" as const },
  cancelled: { label: "Cancelada", variant: "destructive" as const },
}

export function SalesTable() {
  const [selectedSales, setSelectedSales] = useState<string[]>([])
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSales(salesData.map((sale) => sale.id))
    } else {
      setSelectedSales([])
    }
  }

  const handleSelectSale = (saleId: string, checked: boolean) => {
    if (checked) {
      setSelectedSales([...selectedSales, saleId])
    } else {
      setSelectedSales(selectedSales.filter((id) => id !== saleId))
    }
  }

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale)
    setDetailsModalOpen(true)
  }

  const handleEditSale = (sale: Sale) => {
    setSelectedSale(sale)
    setEditModalOpen(true)
  }

  return (
    <>
      <Card className="elevation-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Vendas</CardTitle>
            {selectedSales.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedSales.length} selecionadas</span>
                <Button variant="outline" size="sm">
                  Exportar Selecionadas
                </Button>
                <Button variant="destructive" size="sm">
                  Excluir Selecionadas
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedSales.length === salesData.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="w-12">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id} className="hover:bg-accent/5">
                  <TableCell>
                    <Checkbox
                      checked={selectedSales.includes(sale.id)}
                      onCheckedChange={(checked) => handleSelectSale(sale.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell className="font-semibold">
                    R$ {sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[sale.status].variant}>{statusConfig[sale.status].label}</Badge>
                  </TableCell>
                  <TableCell>{new Date(sale.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{sale.salesperson}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDetails(sale)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSale(sale)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
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

      {/* Modals */}
      <SaleDetailsModal sale={selectedSale} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
      <EditSaleModal sale={selectedSale} open={editModalOpen} onOpenChange={setEditModalOpen} />
    </>
  )
}
