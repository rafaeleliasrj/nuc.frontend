"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Star,
  Edit,
} from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  location: string
  status: "active" | "prospect" | "inactive" | "vip"
  totalPurchases: number
  lastPurchase: string
  avatar?: string
}

interface ClientDetailsModalProps {
  client: Client | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const },
  prospect: { label: "Prospect", variant: "secondary" as const },
  inactive: { label: "Inativo", variant: "outline" as const },
  vip: { label: "VIP", variant: "default" as const },
}

const salesHistory = [
  {
    id: "VND-001",
    product: "Produto Premium A",
    amount: 2500,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "VND-002",
    product: "Serviço Consultoria",
    amount: 5000,
    date: "2024-01-10",
    status: "completed",
  },
  {
    id: "VND-003",
    product: "Produto Standard B",
    amount: 1200,
    date: "2023-12-20",
    status: "completed",
  },
]

export function ClientDetailsModal({ client, open, onOpenChange }: ClientDetailsModalProps) {
  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {client.name}
                  {client.status === "vip" && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                </DialogTitle>
                <DialogDescription className="text-base">{client.company}</DialogDescription>
                <Badge variant={statusConfig[client.status].variant} className="mt-1">
                  {statusConfig[client.status].label}
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="notes">Anotações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="elevation-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total em Compras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {client.totalPurchases.toLocaleString("pt-BR")}</div>
                </CardContent>
              </Card>
              <Card className="elevation-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Total de Pedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card className="elevation-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Ticket Médio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 2.083</div>
                </CardContent>
              </Card>
            </div>

            {/* Client Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="elevation-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{client.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Cliente desde: Jan 2023</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="elevation-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informações da Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium">{client.company}</div>
                    <div className="text-sm text-muted-foreground">CEO & Founder</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>www.empresa.com</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Segmento</div>
                    <div className="font-medium">Tecnologia</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Funcionários</div>
                    <div className="font-medium">50-100</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card className="elevation-1">
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesHistory.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>R$ {sale.amount.toLocaleString("pt-BR")}</TableCell>
                        <TableCell>{new Date(sale.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <Badge variant="default">Concluída</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="elevation-1">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Email Principal</div>
                    <div className="font-medium">{client.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Telefone</div>
                    <div className="font-medium">{client.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">WhatsApp</div>
                    <div className="font-medium">{client.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">LinkedIn</div>
                    <div className="font-medium">linkedin.com/in/cliente</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Endereço Completo</div>
                  <div className="font-medium">
                    Rua das Empresas, 123 - Sala 45
                    <br />
                    {client.location}
                    <br />
                    CEP: 01234-567
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card className="elevation-1">
              <CardHeader>
                <CardTitle>Anotações e Observações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">15/01/2024 - João Vendedor</div>
                  <p>Cliente muito interessado em expandir para novos produtos. Agendar reunião para próxima semana.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">10/01/2024 - Ana Gestora</div>
                  <p>Pagamento sempre em dia. Cliente de alta confiabilidade. Potencial para upgrade para VIP.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">05/01/2024 - Carlos Vendedor</div>
                  <p>Primeira reunião realizada. Cliente demonstrou interesse em soluções enterprise.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
