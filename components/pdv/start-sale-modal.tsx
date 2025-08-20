"use client"
import { ShoppingCart, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StartSaleModalProps {
  open: boolean
  onClose: () => void
  onStartSale: () => void
  onSelectOperator: () => void
  hasOperator: boolean
  operatorName?: string
}

export function StartSaleModal({
  open,
  onClose,
  onStartSale,
  onSelectOperator,
  hasOperator,
  operatorName,
}: StartSaleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Nova Venda
          </DialogTitle>
          <DialogDescription>Configure a sessão antes de iniciar uma nova venda</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Operator Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Operador
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {hasOperator ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{operatorName}</div>
                    <div className="text-sm text-muted-foreground">Sessão ativa</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={onSelectOperator}>
                    Trocar
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-muted-foreground mb-3">Nenhum operador selecionado</div>
                  <Button onClick={onSelectOperator} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Selecionar Operador
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={onStartSale} disabled={!hasOperator} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Iniciar Venda
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
