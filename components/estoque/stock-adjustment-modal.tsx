"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpDown, Package, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StockAdjustmentModalProps {
  open: boolean
  onClose: () => void
  onAdjustmentCreated: (adjustment: any) => void
}

const mockProducts = [
  { id: "1", name: "Camiseta Básica Branca", sku: "CAM-001", currentStock: 45 },
  { id: "2", name: "Calça Jeans Masculina", sku: "CAL-002", currentStock: 8 },
  { id: "3", name: "Tênis Esportivo", sku: "TEN-003", currentStock: 3 },
  { id: "4", name: "Mochila Escolar", sku: "MOC-004", currentStock: 85 },
]

export function StockAdjustmentModal({ open, onClose, onAdjustmentCreated }: StockAdjustmentModalProps) {
  const [formData, setFormData] = useState({
    productId: "",
    newQuantity: "",
    reason: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedProduct = mockProducts.find((p) => p.id === formData.productId)
  const adjustment =
    selectedProduct && formData.newQuantity ? Number.parseInt(formData.newQuantity) - selectedProduct.currentStock : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const adjustmentRecord = {
      productId: formData.productId,
      productName: selectedProduct?.name || "",
      type: "ajuste" as const,
      quantity: adjustment,
      reason: formData.reason,
      date: new Date().toLocaleString("pt-BR"),
      user: "Usuário Atual",
    }

    onAdjustmentCreated(adjustmentRecord)

    // Reset form
    setFormData({
      productId: "",
      newQuantity: "",
      reason: "",
    })
    setSearchTerm("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Ajuste de Estoque
          </DialogTitle>
          <DialogDescription>Corrija a quantidade em estoque de um produto</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Buscar Produto</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Digite o nome ou SKU do produto..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Produto Selecionado</Label>
                <Select
                  value={formData.productId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, productId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{product.name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {product.sku} - Estoque: {product.currentStock}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduct && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedProduct.name}</p>
                      <p className="text-sm text-gray-600">SKU: {selectedProduct.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Estoque Atual</p>
                      <p className="font-bold text-lg">{selectedProduct.currentStock}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Adjustment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ajuste</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nova Quantidade</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.newQuantity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, newQuantity: e.target.value }))}
                  required
                />
              </div>

              {selectedProduct && formData.newQuantity && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Diferença:</span>
                    <span className={`font-bold ${adjustment >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {adjustment >= 0 ? "+" : ""}
                      {adjustment}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Motivo do Ajuste</Label>
                <Textarea
                  placeholder="Descreva o motivo do ajuste de estoque..."
                  value={formData.reason}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!formData.productId || !formData.newQuantity}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Aplicar Ajuste
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
