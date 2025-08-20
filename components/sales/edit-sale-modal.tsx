"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  status: "pending" | "completed" | "cancelled" | "processing"
  date: string
  salesperson: string
}

interface EditSaleModalProps {
  sale: Sale | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSaleModal({ sale, open, onOpenChange }: EditSaleModalProps) {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    amount: 0,
    status: "pending" as const,
    salesperson: "",
    notes: "",
  })

  useEffect(() => {
    if (sale) {
      setFormData({
        customer: sale.customer,
        product: sale.product,
        amount: sale.amount,
        status: sale.status,
        salesperson: sale.salesperson,
        notes: "",
      })
    }
  }, [sale])

  if (!sale) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Venda {sale.id}</DialogTitle>
          <DialogDescription>Atualize as informações da venda</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-customer">Cliente</Label>
              <Input
                id="edit-customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-product">Produto</Label>
              <Input
                id="edit-product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-amount">Valor</Label>
              <Input
                id="edit-amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-salesperson">Vendedor</Label>
            <Select
              value={formData.salesperson}
              onValueChange={(value) => setFormData({ ...formData, salesperson: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="João Vendedor">João Vendedor</SelectItem>
                <SelectItem value="Ana Gestora">Ana Gestora</SelectItem>
                <SelectItem value="Carlos Vendedor">Carlos Vendedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Observações</Label>
            <Textarea
              id="edit-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações sobre a venda..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
