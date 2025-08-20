"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Shield,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  CreditCard,
  DollarSign,
  Warehouse,
  Settings,
  Plus,
  Edit,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Permission {
  id: string
  name: string
  description: string
  module: string
  icon: any
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

const permissions: Permission[] = [
  { id: "vendas_criar", name: "Criar Vendas", description: "Criar novas vendas", module: "Vendas", icon: ShoppingCart },
  {
    id: "vendas_editar",
    name: "Editar Vendas",
    description: "Editar vendas existentes",
    module: "Vendas",
    icon: ShoppingCart,
  },
  { id: "vendas_excluir", name: "Excluir Vendas", description: "Excluir vendas", module: "Vendas", icon: ShoppingCart },
  {
    id: "clientes_criar",
    name: "Criar Clientes",
    description: "Cadastrar novos clientes",
    module: "Clientes",
    icon: Users,
  },
  {
    id: "clientes_editar",
    name: "Editar Clientes",
    description: "Editar dados de clientes",
    module: "Clientes",
    icon: Users,
  },
  {
    id: "produtos_criar",
    name: "Criar Produtos",
    description: "Cadastrar novos produtos",
    module: "Produtos",
    icon: Package,
  },
  {
    id: "produtos_editar",
    name: "Editar Produtos",
    description: "Editar produtos existentes",
    module: "Produtos",
    icon: Package,
  },
  {
    id: "relatorios_visualizar",
    name: "Visualizar Relatórios",
    description: "Acessar relatórios",
    module: "Relatórios",
    icon: BarChart3,
  },
  { id: "pdv_operar", name: "Operar PDV", description: "Usar ponto de venda", module: "PDV", icon: CreditCard },
  {
    id: "financeiro_visualizar",
    name: "Visualizar Financeiro",
    description: "Acessar módulo financeiro",
    module: "Financeiro",
    icon: DollarSign,
  },
  {
    id: "estoque_controlar",
    name: "Controlar Estoque",
    description: "Gerenciar estoque",
    module: "Estoque",
    icon: Warehouse,
  },
  {
    id: "configuracoes_acessar",
    name: "Acessar Configurações",
    description: "Modificar configurações",
    module: "Sistema",
    icon: Settings,
  },
]

const roles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso total ao sistema",
    permissions: permissions.map((p) => p.id),
    userCount: 2,
  },
  {
    id: "gerente",
    name: "Gerente",
    description: "Gerenciamento de vendas e relatórios",
    permissions: [
      "vendas_criar",
      "vendas_editar",
      "clientes_criar",
      "clientes_editar",
      "produtos_criar",
      "produtos_editar",
      "relatorios_visualizar",
      "pdv_operar",
      "financeiro_visualizar",
      "estoque_controlar",
    ],
    userCount: 3,
  },
  {
    id: "supervisor",
    name: "Supervisor",
    description: "Supervisão de vendas e PDV",
    permissions: [
      "vendas_criar",
      "vendas_editar",
      "clientes_criar",
      "clientes_editar",
      "relatorios_visualizar",
      "pdv_operar",
    ],
    userCount: 2,
  },
  {
    id: "vendedor",
    name: "Vendedor",
    description: "Operações básicas de venda",
    permissions: ["vendas_criar", "clientes_criar", "pdv_operar"],
    userCount: 5,
  },
]

export default function PermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [rolePermissions, setRolePermissions] = useState<{ [key: string]: string[] }>({})

  const handlePermissionToggle = (roleId: string, permissionId: string, enabled: boolean) => {
    setRolePermissions((prev) => {
      const current = prev[roleId] || roles.find((r) => r.id === roleId)?.permissions || []
      return {
        ...prev,
        [roleId]: enabled ? [...current, permissionId] : current.filter((p) => p !== permissionId),
      }
    })
  }

  const getRolePermissions = (roleId: string) => {
    return rolePermissions[roleId] || roles.find((r) => r.id === roleId)?.permissions || []
  }

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = []
      }
      acc[permission.module].push(permission)
      return acc
    },
    {} as { [key: string]: Permission[] },
  )

  return (
    <MainLayout title="Gerenciamento de Permissões">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Permissões e Funções</h1>
            <p className="text-gray-600">Configure permissões por função no sistema</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Função
          </Button>
        </div>

        {/* Roles Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{role.userCount} usuários</Badge>
                </div>
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <CardDescription className="text-sm">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">{role.permissions.length} permissões ativas</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permissions Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Matrix de Permissões</CardTitle>
            <CardDescription>Configure as permissões para cada função do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Permissão</TableHead>
                    {roles.map((role) => (
                      <TableHead key={role.id} className="text-center min-w-[120px]">
                        {role.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                    <>
                      <TableRow key={module} className="bg-gray-50">
                        <TableCell colSpan={roles.length + 1} className="font-semibold text-gray-900">
                          {module}
                        </TableCell>
                      </TableRow>
                      {modulePermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <permission.icon className="h-4 w-4 text-gray-500" />
                              <div>
                                <div className="font-medium">{permission.name}</div>
                                <div className="text-sm text-gray-500">{permission.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          {roles.map((role) => (
                            <TableCell key={role.id} className="text-center">
                              <Switch
                                checked={getRolePermissions(role.id).includes(permission.id)}
                                onCheckedChange={(checked) => handlePermissionToggle(role.id, permission.id, checked)}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Role Details */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {selectedRole.name}
                  </CardTitle>
                  <CardDescription>{selectedRole.description}</CardDescription>
                </div>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Função
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{selectedRole.userCount} usuários</Badge>
                  <Badge variant="outline">{selectedRole.permissions.length} permissões</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Permissões Ativas:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedRole.permissions.map((permissionId) => {
                      const permission = permissions.find((p) => p.id === permissionId)
                      return permission ? (
                        <div key={permissionId} className="flex items-center gap-2 text-sm">
                          <permission.icon className="h-3 w-3" />
                          {permission.name}
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
