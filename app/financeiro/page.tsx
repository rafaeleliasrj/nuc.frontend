"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FinancialChart } from "@/components/financeiro/financial-chart"
import { CashFlowChart } from "@/components/financeiro/cash-flow-chart"
import { AccountsReceivableModal } from "@/components/financeiro/accounts-receivable-modal"
import { AccountsPayableModal } from "@/components/financeiro/accounts-payable-modal"

interface Transaction {
  id: string
  type: "receita" | "despesa"
  description: string
  amount: number
  category: string
  date: string
  status: "pago" | "pendente" | "vencido"
  dueDate?: string
  customer?: string
  supplier?: string
}

interface FinancialMetrics {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  cashFlow: number
  accountsReceivable: number
  accountsPayable: number
  monthlyGrowth: number
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "receita",
    description: "Venda - Cliente ABC Ltda",
    amount: 2500.0,
    category: "Vendas",
    date: "2024-01-20",
    status: "pago",
    customer: "ABC Ltda",
  },
  {
    id: "2",
    type: "despesa",
    description: "Fornecedor XYZ - Mercadorias",
    amount: 1200.0,
    category: "Compras",
    date: "2024-01-19",
    status: "pago",
    supplier: "XYZ Fornecedor",
  },
  {
    id: "3",
    type: "receita",
    description: "Venda PDV - Diversos",
    amount: 850.0,
    category: "Vendas",
    date: "2024-01-18",
    status: "pago",
  },
  {
    id: "4",
    type: "despesa",
    description: "Aluguel - Janeiro 2024",
    amount: 3500.0,
    category: "Operacional",
    date: "2024-01-15",
    status: "pago",
  },
  {
    id: "5",
    type: "receita",
    description: "Venda - Cliente DEF Corp",
    amount: 4200.0,
    category: "Vendas",
    date: "2024-01-25",
    status: "pendente",
    dueDate: "2024-02-25",
    customer: "DEF Corp",
  },
]

const mockMetrics: FinancialMetrics = {
  totalRevenue: 45600.0,
  totalExpenses: 28400.0,
  netProfit: 17200.0,
  cashFlow: 12800.0,
  accountsReceivable: 8900.0,
  accountsPayable: 5600.0,
  monthlyGrowth: 12.5,
}

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [metrics] = useState<FinancialMetrics>(mockMetrics)
  const [periodFilter, setPeriodFilter] = useState("30")
  const [showReceivableModal, setShowReceivableModal] = useState(false)
  const [showPayableModal, setShowPayableModal] = useState(false)

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      pago: "default",
      pendente: "secondary",
      vencido: "destructive",
    } as const

    const labels = {
      pago: "Pago",
      pendente: "Pendente",
      vencido: "Vencido",
    }

    return (
      <Badge variant={variants[status]} className="text-xs">
        {labels[status]}
      </Badge>
    )
  }

  const recentTransactions = transactions.slice(0, 5)
  const pendingReceivables = transactions.filter((t) => t.type === "receita" && t.status === "pendente")
  const pendingPayables = transactions.filter((t) => t.type === "despesa" && t.status === "pendente")

  return (
    <MainLayout title="Módulo Financeiro">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
            <p className="text-gray-600">Controle financeiro completo da empresa</p>
          </div>
          <div className="flex gap-2">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receitas</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {metrics.totalRevenue.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />+{metrics.monthlyGrowth}% este mês
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Despesas</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {metrics.totalExpenses.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-gray-500 mt-1">Operacionais e compras</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {metrics.netProfit.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {((metrics.netProfit / metrics.totalRevenue) * 100).toFixed(1)}% margem
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fluxo de Caixa</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {metrics.cashFlow.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-gray-500 mt-1">Saldo atual</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="receber">A Receber</TabsTrigger>
            <TabsTrigger value="pagar">A Pagar</TabsTrigger>
            <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Receitas vs Despesas</CardTitle>
                  <CardDescription>Comparativo mensal dos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <FinancialChart />
                </CardContent>
              </Card>

              {/* Accounts Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo de Contas</CardTitle>
                  <CardDescription>Status atual de recebimentos e pagamentos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowDownRight className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Contas a Receber</p>
                        <p className="text-sm text-gray-600">{pendingReceivables.length} pendentes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        R$ {metrics.accountsReceivable.toLocaleString("pt-BR")}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-1 bg-transparent"
                        onClick={() => setShowReceivableModal(true)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Contas a Pagar</p>
                        <p className="text-sm text-gray-600">{pendingPayables.length} pendentes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        R$ {metrics.accountsPayable.toLocaleString("pt-BR")}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-1 bg-transparent"
                        onClick={() => setShowPayableModal(true)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>Últimas movimentações financeiras</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {transaction.type === "receita" ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className="capitalize">{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell
                          className={`font-mono ${transaction.type === "receita" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "receita" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receber" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contas a Receber</h3>
                <p className="text-sm text-gray-600">Gerencie os recebimentos pendentes</p>
              </div>
              <Button onClick={() => setShowReceivableModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Conta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">A Vencer</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 6.400</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Recebido</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 12.800</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Em Atraso</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 2.500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReceivables.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.customer || "N/A"}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="font-mono text-green-600">R$ {transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString("pt-BR") : "N/A"}
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Receber
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagar" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contas a Pagar</h3>
                <p className="text-sm text-gray-600">Gerencie os pagamentos pendentes</p>
              </div>
              <Button onClick={() => setShowPayableModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Conta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">A Vencer</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 4.200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pago</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 8.900</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Em Atraso</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 1.400</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fluxo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>Projeção de entradas e saídas</CardDescription>
              </CardHeader>
              <CardContent>
                <CashFlowChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    DRE
                  </CardTitle>
                  <CardDescription>Demonstrativo do Resultado do Exercício</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Gerar Relatório</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Análise de Custos
                  </CardTitle>
                  <CardDescription>Distribuição de despesas por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Gerar Relatório</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Lucratividade
                  </CardTitle>
                  <CardDescription>Análise de margem e rentabilidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Gerar Relatório</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AccountsReceivableModal
        open={showReceivableModal}
        onClose={() => setShowReceivableModal(false)}
        onAccountCreated={(account) => {
          console.log("Nova conta a receber:", account)
          setShowReceivableModal(false)
        }}
      />

      <AccountsPayableModal
        open={showPayableModal}
        onClose={() => setShowPayableModal(false)}
        onAccountCreated={(account) => {
          console.log("Nova conta a pagar:", account)
          setShowPayableModal(false)
        }}
      />
    </MainLayout>
  )
}
