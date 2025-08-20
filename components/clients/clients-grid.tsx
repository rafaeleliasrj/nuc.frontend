"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientDetailsModal } from "./client-details-modal"
import { EditClientModal } from "./edit-client-modal"
import { Eye, Edit, Trash2, MoreHorizontal, Phone, Mail, MapPin, Star, TrendingUp } from "lucide-react"

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

const clientsData: Client[] = [
  {
    id: "CLI-001",
    name: "Maria Silva",
    email: "maria@empresa.com",
    phone: "(11) 99999-1111",
    company: "Tech Solutions Ltda",
    location: "São Paulo, SP",
    status: "vip",
    totalPurchases: 25000,
    lastPurchase: "2024-01-15",
  },
  {
    id: "CLI-002",
    name: "Pedro Santos",
    email: "pedro@startup.com",
    phone: "(11) 99999-2222",
    company: "StartupX",
    location: "Rio de Janeiro, RJ",
    status: "active",
    totalPurchases: 8500,
    lastPurchase: "2024-01-10",
  },
  {
    id: "CLI-003",
    name: "Ana Costa",
    email: "ana@consultoria.com",
    phone: "(11) 99999-3333",
    company: "Costa Consultoria",
    location: "Belo Horizonte, MG",
    status: "prospect",
    totalPurchases: 0,
    lastPurchase: "",
  },
  {
    id: "CLI-004",
    name: "João Lima",
    email: "joao@corporacao.com",
    phone: "(11) 99999-4444",
    company: "Corporação ABC",
    location: "Brasília, DF",
    status: "active",
    totalPurchases: 15000,
    lastPurchase: "2024-01-08",
  },
  {
    id: "CLI-005",
    name: "Carla Oliveira",
    email: "carla@inovacao.com",
    phone: "(11) 99999-5555",
    company: "Inovação Digital",
    location: "Porto Alegre, RS",
    status: "inactive",
    totalPurchases: 3200,
    lastPurchase: "2023-11-20",
  },
  {
    id: "CLI-006",
    name: "Roberto Ferreira",
    email: "roberto@logistica.com",
    phone: "(11) 99999-6666",
    company: "Logística Express",
    location: "Curitiba, PR",
    status: "vip",
    totalPurchases: 45000,
    lastPurchase: "2024-01-12",
  },
]

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const, color: "text-green-600" },
  prospect: { label: "Prospect", variant: "secondary" as const, color: "text-blue-600" },
  inactive: { label: "Inativo", variant: "outline" as const, color: "text-gray-600" },
  vip: { label: "VIP", variant: "default" as const, color: "text-yellow-600" },
}

export function ClientsGrid() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client)
    setDetailsModalOpen(true)
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
    setEditModalOpen(true)
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientsData.map((client) => (
          <Card key={client.id} className="elevation-1 hover:elevation-2 transition-all cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {client.status === "vip" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewDetails(client)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClient(client)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge variant={statusConfig[client.status].variant}>{statusConfig[client.status].label}</Badge>
                {client.totalPurchases > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-semibold">R$ {client.totalPurchases.toLocaleString("pt-BR")}</div>
                    <div className="text-xs text-muted-foreground">Total em compras</div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{client.location}</span>
                </div>
              </div>

              {/* Last Purchase */}
              {client.lastPurchase && (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Última compra:</span>
                    <span className="font-medium">{new Date(client.lastPurchase).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleViewDetails(client)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Perfil
                </Button>
                <Button size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Nova Venda
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <ClientDetailsModal client={selectedClient} open={detailsModalOpen} onOpenChange={setDetailsModalOpen} />
      <EditClientModal client={selectedClient} open={editModalOpen} onOpenChange={setEditModalOpen} />
    </>
  )
}
