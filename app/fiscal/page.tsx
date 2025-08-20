"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Download, Send, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const nfceList = [
  {
    id: "001",
    numero: "000001",
    cliente: "João Silva",
    valor: 150.0,
    status: "autorizada",
    data: "2024-01-15",
    chave: "35240114200166000187650010000000011234567890",
  },
  {
    id: "002",
    numero: "000002",
    cliente: "Maria Santos",
    valor: 89.5,
    status: "pendente",
    data: "2024-01-15",
    chave: "",
  },
  {
    id: "003",
    numero: "000003",
    cliente: "Pedro Costa",
    valor: 320.0,
    status: "cancelada",
    data: "2024-01-14",
    chave: "35240114200166000187650010000000031234567890",
  },
]

const nfeList = [
  {
    id: "001",
    numero: "000001",
    cliente: "Empresa ABC Ltda",
    valor: 2500.0,
    status: "autorizada",
    data: "2024-01-15",
    chave: "35240114200166000187550010000000011234567890",
  },
  {
    id: "002",
    numero: "000002",
    cliente: "Comércio XYZ",
    valor: 1890.0,
    status: "pendente",
    data: "2024-01-15",
    chave: "",
  },
]

export default function FiscalPage() {
  const [selectedTab, setSelectedTab] = useState("nfce")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "autorizada":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Autorizada
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "cancelada":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <MainLayout>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notas Fiscais</h1>
            <p className="text-muted-foreground">Gerencie NFC-e e NF-e do seu negócio</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova NFC-e
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Emitir Nova NFC-e</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para emissão da Nota Fiscal do Consumidor Eletrônica
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input id="cliente" placeholder="Nome do cliente" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF (opcional)</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="produtos">Produtos</Label>
                    <Textarea id="produtos" placeholder="Liste os produtos..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor-total">Valor Total</Label>
                      <Input id="valor-total" placeholder="R$ 0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="forma-pagamento">Forma de Pagamento</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                          <SelectItem value="cartao-debito">Cartão de Débito</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Emitir NFC-e</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova NF-e
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Emitir Nova NF-e</DialogTitle>
                  <DialogDescription>Preencha os dados para emissão da Nota Fiscal Eletrônica</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input id="empresa" placeholder="Razão social" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0001-00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Endereço completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="produtos-nfe">Produtos/Serviços</Label>
                    <Textarea id="produtos-nfe" placeholder="Descreva os produtos ou serviços..." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor-produtos">Valor Produtos</Label>
                      <Input id="valor-produtos" placeholder="R$ 0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valor-impostos">Impostos</Label>
                      <Input id="valor-impostos" placeholder="R$ 0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valor-total-nfe">Valor Total</Label>
                      <Input id="valor-total-nfe" placeholder="R$ 0,00" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Emitir NF-e</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="nfce">NFC-e</TabsTrigger>
            <TabsTrigger value="nfe">NF-e</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="nfce" className="space-y-6">
            <div className="grid gap-4">
              {nfceList.map((nfce) => (
                <Card key={nfce.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">NFC-e #{nfce.numero}</h3>
                          <p className="text-sm text-muted-foreground">{nfce.cliente}</p>
                          <p className="text-sm text-muted-foreground">{nfce.data}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">R$ {nfce.valor.toFixed(2)}</p>
                        {getStatusBadge(nfce.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {nfce.chave && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Chave de Acesso:</p>
                        <p className="text-sm font-mono">{nfce.chave}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nfe" className="space-y-6">
            <div className="grid gap-4">
              {nfeList.map((nfe) => (
                <Card key={nfe.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">NF-e #{nfe.numero}</h3>
                          <p className="text-sm text-muted-foreground">{nfe.cliente}</p>
                          <p className="text-sm text-muted-foreground">{nfe.data}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">R$ {nfe.valor.toFixed(2)}</p>
                        {getStatusBadge(nfe.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {nfe.chave && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Chave de Acesso:</p>
                        <p className="text-sm font-mono">{nfe.chave}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Fiscais</CardTitle>
                <CardDescription>Configure os parâmetros para emissão de notas fiscais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serie-nfce">Série NFC-e</Label>
                    <Input id="serie-nfce" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serie-nfe">Série NF-e</Label>
                    <Input id="serie-nfe" placeholder="1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ambiente">Ambiente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homologacao">Homologação</SelectItem>
                      <SelectItem value="producao">Produção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
