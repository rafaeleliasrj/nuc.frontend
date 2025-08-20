"use client"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Package, DollarSign } from "lucide-react"

interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  status: "pending" | "completed" | "cancelled" | "processing"
  date: string
  salesperson: string
}

interface SaleDetailsModalProps {
  sale: Sale | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  pending: { label: "Pendente", variant: "secondary" as const },
  processing: { label: "Processando", variant: "default" as const },
  completed: { label: "Concluída", variant: "default" as const },
  cancelled: { label: "Cancelada", variant: "destructive" as const },
}

export function SaleDetailsModal({ sale, open, onOpenChange }: SaleDetailsModalProps) {
  if (!sale) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes da Venda {sale.id}</DialogTitle>
          <DialogDescription>Informações completas da venda</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="flex items-center justify-between">
            <Badge variant={statusConfig[sale.status].variant} className="text-sm">
              {statusConfig[sale.status].label}
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold">
                R$ {sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-muted-foreground">Valor Total</div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="font-medium">{sale.customer}</div>
                <div className="text-sm text-muted-foreground">cliente@email.com</div>
                <div className="text-sm text-muted-foreground">(11) 99999-9999</div>
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produto/Serviço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">{sale.product}</div>
                <div className="text-sm text-muted-foreground">
                  Quantidade: 1 | Preço unitário: R$ {sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sale Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Informações da Venda
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground">Vendedor</div>
                <div className="font-medium">{sale.salesperson}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Data da Venda</div>
                <div className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(sale.date).toLocaleDateString("pt-BR")}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Método de Pagamento</div>
                <div className="font-medium">Cartão de Crédito</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Comissão</div>
                <div className="font-medium">
                  R$ {(sale.amount * 0.1).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cliente interessado em produtos similares. Agendar follow-up para próxima semana.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
