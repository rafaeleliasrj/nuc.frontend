"use client"
import { useState } from "react"
import type React from "react"

import { Package, Plus, Search, Filter, Upload, Grid3X3, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MainLayout } from "@/components/layout/main-layout"

const produtos = [
  {
    id: 1,
    nome: "Camiseta Básica",
    codigo: "CAM001",
    categoria: "Roupas",
    preco: 29.9,
    estoque: 150,
    imagem: "/plain-tshirt.png",
    grades: ["P", "M", "G", "GG"],
    cores: ["Branco", "Preto", "Azul"],
  },
  {
    id: 2,
    nome: "Calça Jeans",
    codigo: "CAL002",
    categoria: "Roupas",
    preco: 89.9,
    estoque: 75,
    imagem: "/jeans-display.png",
    grades: ["36", "38", "40", "42", "44"],
    cores: ["Azul", "Preto"],
  },
]

export default function CadastrosProdutosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [hasGrades, setHasGrades] = useState(false)
  const [grades, setGrades] = useState<string[]>([])
  const [cores, setCores] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedImages((prev) => [...prev, ...files])
  }

  const addGrade = (grade: string) => {
    if (grade && !grades.includes(grade)) {
      setGrades([...grades, grade])
    }
  }

  const addCor = (cor: string) => {
    if (cor && !cores.includes(cor)) {
      setCores([...cores, cor])
    }
  }

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cadastro de Produtos</h1>
            <p className="text-muted-foreground">Gerencie o catálogo de produtos</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Produto</DialogTitle>
                <DialogDescription>Preencha as informações do produto</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basico" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basico">Básico</TabsTrigger>
                  <TabsTrigger value="imagens">Imagens</TabsTrigger>
                  <TabsTrigger value="grades">Grades</TabsTrigger>
                  <TabsTrigger value="estoque">Estoque</TabsTrigger>
                </TabsList>

                <TabsContent value="basico" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome do Produto *</Label>
                      <Input id="nome" placeholder="Digite o nome do produto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigo">Código *</Label>
                      <Input id="codigo" placeholder="PRD001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roupas">Roupas</SelectItem>
                          <SelectItem value="calcados">Calçados</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marca">Marca</Label>
                      <Input id="marca" placeholder="Digite a marca" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco-custo">Preço de Custo</Label>
                      <Input id="preco-custo" type="number" placeholder="0.00" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco-venda">Preço de Venda *</Label>
                      <Input id="preco-venda" type="number" placeholder="0.00" step="0.01" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" placeholder="Descrição detalhada do produto" rows={4} />
                  </div>
                </TabsContent>

                <TabsContent value="imagens" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Imagens do Produto</Label>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Adicionar Imagens
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Produto ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setSelectedImages((prev) => prev.filter((_, i) => i !== index))}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="grades" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="has-grades" checked={hasGrades} onCheckedChange={setHasGrades} />
                    <Label htmlFor="has-grades">Este produto possui grades (tamanhos/cores)</Label>
                  </div>

                  {hasGrades && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Grid3X3 className="h-5 w-5" />
                          <Label>Tamanhos/Grades</Label>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ex: P, M, G, 36, 38..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addGrade(e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              addGrade(input.value)
                              input.value = ""
                            }}
                          >
                            Adicionar
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {grades.map((grade, index) => (
                            <Badge key={index} variant="secondary" className="gap-1">
                              {grade}
                              <button
                                onClick={() => setGrades((prev) => prev.filter((_, i) => i !== index))}
                                className="ml-1 text-xs"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          <Label>Cores</Label>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ex: Branco, Preto, Azul..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addCor(e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              addCor(input.value)
                              input.value = ""
                            }}
                          >
                            Adicionar
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cores.map((cor, index) => (
                            <Badge key={index} variant="secondary" className="gap-1">
                              {cor}
                              <button
                                onClick={() => setCores((prev) => prev.filter((_, i) => i !== index))}
                                className="ml-1 text-xs"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="estoque" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estoque-inicial">Estoque Inicial</Label>
                      <Input id="estoque-inicial" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estoque-minimo">Estoque Mínimo</Label>
                      <Input id="estoque-minimo" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localizacao">Localização</Label>
                      <Input id="localizacao" placeholder="Ex: Prateleira A1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fornecedor">Fornecedor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
                          <SelectItem value="fornecedor2">Fornecedor 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Produto</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="roupas">Roupas</SelectItem>
                  <SelectItem value="calcados">Calçados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={produto.imagem || "/placeholder.svg"}
                    alt={produto.nome}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{produto.nome}</h3>
                      <p className="text-sm text-muted-foreground">{produto.codigo}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">R$ {produto.preco.toFixed(2)}</span>
                      <Badge variant={produto.estoque > 10 ? "default" : "destructive"}>{produto.estoque} un.</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {produto.grades.slice(0, 3).map((grade) => (
                        <Badge key={grade} variant="outline" className="text-xs">
                          {grade}
                        </Badge>
                      ))}
                      {produto.grades.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{produto.grades.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
