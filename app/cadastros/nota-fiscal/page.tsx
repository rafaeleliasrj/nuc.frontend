"use client"
import { useState } from "react"
import type React from "react"

import { Receipt, Settings, FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function ConfiguracaoNotaFiscalPage() {
  const [certificadoFile, setCertificadoFile] = useState<File | null>(null)

  const handleCertificadoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCertificadoFile(file)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuração de Nota Fiscal</h1>
          <p className="text-gray-600">Configure as opções de emissão de notas fiscais</p>
        </div>
        <Button className="gap-2">
          <Settings className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="certificado">Certificado</TabsTrigger>
          <TabsTrigger value="series">Séries</TabsTrigger>
          <TabsTrigger value="impostos">Impostos</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>Configurações básicas para emissão de notas fiscais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ambiente">Ambiente de Emissão</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo da Nota</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="55">55 - NFe</SelectItem>
                      <SelectItem value="65">65 - NFCe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="versao">Versão do Layout</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a versão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.00">4.00</SelectItem>
                      <SelectItem value="3.10">3.10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="csc-id">CSC ID</Label>
                  <Input id="csc-id" placeholder="Digite o ID do CSC" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="csc-token">CSC Token</Label>
                  <Input id="csc-token" type="password" placeholder="Digite o token CSC" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opções de Emissão</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="emissao-automatica" />
                    <Label htmlFor="emissao-automatica">Emissão automática ao finalizar venda</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="envio-email" />
                    <Label htmlFor="envio-email">Enviar por e-mail automaticamente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="impressao-automatica" />
                    <Label htmlFor="impressao-automatica">Impressão automática</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificado" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificado Digital
              </CardTitle>
              <CardDescription>Configure o certificado digital para assinatura das notas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Certificado A1 (.pfx)</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      {certificadoFile ? (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span className="text-sm text-green-700">{certificadoFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">Nenhum certificado selecionado</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="certificado-upload"
                        accept=".pfx,.p12"
                        onChange={handleCertificadoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("certificado-upload")?.click()}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Selecionar Certificado
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha-certificado">Senha do Certificado</Label>
                  <Input id="senha-certificado" type="password" placeholder="Digite a senha do certificado" />
                </div>

                {certificadoFile && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Informações do Certificado</h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>
                        <strong>Nome:</strong> EMPRESA EXEMPLO LTDA
                      </p>
                      <p>
                        <strong>CNPJ:</strong> 12.345.678/0001-90
                      </p>
                      <p>
                        <strong>Válido até:</strong> 15/12/2024
                      </p>
                      <p>
                        <strong>Emissor:</strong> AC SERASA RFB v5
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="series" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Séries de Numeração</CardTitle>
              <CardDescription>Configure as séries para numeração das notas fiscais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serie-nfe">Série NFe</Label>
                  <Input id="serie-nfe" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero-inicial-nfe">Número Inicial NFe</Label>
                  <Input id="numero-inicial-nfe" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serie-nfce">Série NFCe</Label>
                  <Input id="serie-nfce" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero-inicial-nfce">Número Inicial NFCe</Label>
                  <Input id="numero-inicial-nfce" type="number" placeholder="1" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Numeração Atual</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Próxima NFe</div>
                    <div className="text-2xl font-bold text-gray-900">000.000.001</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Próxima NFCe</div>
                    <div className="text-2xl font-bold text-gray-900">000.000.001</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impostos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Impostos</CardTitle>
              <CardDescription>Configure as alíquotas e regras de impostos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="icms-padrao">ICMS Padrão (%)</Label>
                  <Input id="icms-padrao" type="number" placeholder="18.00" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipi-padrao">IPI Padrão (%)</Label>
                  <Input id="ipi-padrao" type="number" placeholder="0.00" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pis-padrao">PIS Padrão (%)</Label>
                  <Input id="pis-padrao" type="number" placeholder="1.65" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cofins-padrao">COFINS Padrão (%)</Label>
                  <Input id="cofins-padrao" type="number" placeholder="7.60" step="0.01" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes-padrao">Observações Padrão</Label>
                <Textarea
                  id="observacoes-padrao"
                  placeholder="Digite as observações que aparecerão por padrão nas notas fiscais"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
