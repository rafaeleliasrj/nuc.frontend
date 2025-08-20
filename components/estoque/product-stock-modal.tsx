"use client"

import { Package, MapPin, TrendingUp, TrendingDown } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProductStockModalProps {
  open: boolean
  product: any
  onClose: () => void
}

export function ProductStockModal({ open, product, onClose }: ProductStockModalProps) {
  if (!product) return null

  const stockPercentage = (product.currentStock / product.maxStock) * 100

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalhes do Estoque
          </DialogTitle>
          <DialogDescription>Informações detalhadas sobre {product.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SKU</p>
                  <p className="font-medium">{product.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categoria</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Localização</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <p className="font-medium">{product.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status do Estoque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estoque Atual</span>
                <span className="text-2xl font-bold">{product.currentStock}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mínimo: {product.minStock}</span>
                  <span>Máximo: {product.maxStock}</span>
                </div>
                <Progress value={stockPercentage} className="h-2" />
                <div className="flex justify-center">
                  <Badge
                    variant={
                      product.status === "normal" ? "default" : product.status === "low" ? "secondary" : "destructive"
                    }
                  >
                    {product.status === "normal" ? "Normal" : product.status === "low" ? "Baixo" : "Crítico"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Custo Unitário</p>
                  <p className="text-xl font-bold">R$ {product.unitCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor Total em Estoque</p>
                  <p className="text-xl font-bold text-green-600">R$ {product.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Entrada de Estoque</p>
                    <p className="text-xs text-gray-600">+50 unidades - Compra Fornecedor ABC</p>
                  </div>
                  <div className="text-xs text-gray-500">20/01/2024</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Saída de Estoque</p>
                    <p className="text-xs text-gray-600">-12 unidades - Venda PDV</p>
                  </div>
                  <div className="text-xs text-gray-500">19/01/2024</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
