"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, ExternalLink, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const integrations = [
  {
    id: "mercadolivre",
    name: "Mercado Livre",
    description: "Sincronize produtos e pedidos com o Mercado Livre",
    logo: "/mercado-livre-logo.png",
    status: "connected",
    lastSync: "2 horas atrás",
    products: 245,
    orders: 12,
  },
  {
    id: "americanas",
    name: "Americanas",
    description: "Integração com marketplace das Americanas",
    logo: "/americanas-logo.png",
    status: "disconnected",
    lastSync: "Nunca",
    products: 0,
    orders: 0,
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Venda seus produtos na Amazon Brasil",
    logo: "/amazon-logo.png",
    status: "pending",
    lastSync: "Configurando...",
    products: 0,
    orders: 0,
  },
  {
    id: "shopee",
    name: "Shopee",
    description: "Marketplace Shopee para vendas online",
    logo: "/shopee-logo.png",
    status: "connected",
    lastSync: "1 hora atrás",
    products: 89,
    orders: 5,
  },
]

export default function IntegracaoPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Conectado
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 mr-1" />
            Desconectado
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <MainLayout>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">Conecte seu sistema com marketplaces e plataformas de venda</p>
        </div>

        <Tabs defaultValue="marketplaces" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="logistica">Logística</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplaces" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.logo || "/placeholder.svg"}
                          alt={integration.name}
                          className="w-10 h-10 rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="text-sm">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Produtos</p>
                        <p className="font-semibold">{integration.products}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pedidos</p>
                        <p className="font-semibold">{integration.orders}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Última sincronização</p>
                      <p className="font-medium">{integration.lastSync}</p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Settings className="w-4 h-4 mr-2" />
                            Configurar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Configurar {integration.name}</DialogTitle>
                            <DialogDescription>
                              Configure as credenciais e parâmetros para integração com {integration.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="api-key">API Key</Label>
                              <Input id="api-key" placeholder="Sua API Key" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secret">Secret Key</Label>
                              <Input id="secret" type="password" placeholder="Sua Secret Key" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="auto-sync" />
                              <Label htmlFor="auto-sync">Sincronização automática</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancelar</Button>
                            <Button>Salvar Configuração</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pagamentos">
            <Card>
              <CardHeader>
                <CardTitle>Integrações de Pagamento</CardTitle>
                <CardDescription>Configure gateways de pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logistica">
            <Card>
              <CardHeader>
                <CardTitle>Integrações de Logística</CardTitle>
                <CardDescription>Configure transportadoras e correios</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
