"use client";
import { useState } from "react";
import type React from "react";

import {
  Shield,
  Plus,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";

const certificados = [
  {
    id: 1,
    nome: "EMPRESA EXEMPLO LTDA",
    cnpj: "12.345.678/0001-90",
    tipo: "A1",
    emissor: "AC SERASA RFB v5",
    validoAte: "2024-12-15",
    status: "Válido",
    diasRestantes: 45,
  },
  {
    id: 2,
    nome: "EMPRESA TESTE S.A.",
    cnpj: "98.765.432/0001-10",
    tipo: "A3",
    emissor: "AC CERTISIGN RFB G5",
    validoAte: "2024-08-30",
    status: "Vencendo",
    diasRestantes: 11,
  },
];

export default function CadastrosCertificadosPage() {
  const [certificadoFile, setCertificadoFile] = useState<File | null>(null);

  const handleCertificadoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertificadoFile(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Válido":
        return "default";
      case "Vencendo":
        return "destructive";
      case "Vencido":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Válido":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Vencendo":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "Vencido":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciamento de Certificados
            </h1>
            <p className="text-gray-600">
              Gerencie os certificados digitais da empresa
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Certificado
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Certificado</DialogTitle>
                <DialogDescription>
                  Faça upload de um novo certificado digital
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Arquivo do Certificado</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        {certificadoFile ? (
                          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Shield className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-700">
                              {certificadoFile.name}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <Shield className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Nenhum certificado selecionado
                            </span>
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
                          onClick={() =>
                            document
                              .getElementById("certificado-upload")
                              ?.click()
                          }
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Selecionar Arquivo
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Formatos aceitos: .pfx, .p12 (Certificado A1)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senha-certificado">
                      Senha do Certificado
                    </Label>
                    <Input
                      id="senha-certificado"
                      type="password"
                      placeholder="Digite a senha do certificado"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição (Opcional)</Label>
                    <Input
                      id="descricao"
                      placeholder="Ex: Certificado para NFe - Matriz"
                    />
                  </div>
                </div>

                {certificadoFile && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Prévia do Certificado
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>
                        <strong>Arquivo:</strong> {certificadoFile.name}
                      </p>
                      <p>
                        <strong>Tamanho:</strong>{" "}
                        {(certificadoFile.size / 1024).toFixed(2)} KB
                      </p>
                      <p>
                        <strong>Tipo:</strong>{" "}
                        {certificadoFile.type || "application/x-pkcs12"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button disabled={!certificadoFile}>
                    Adicionar Certificado
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alertas de Certificados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">1</p>
                  <p className="text-sm text-gray-600">Certificados Válidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                  <p className="text-sm text-gray-600">Vencendo em 30 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">0</p>
                  <p className="text-sm text-gray-600">Certificados Vencidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Certificados */}
        <div className="space-y-4">
          {certificados.map((certificado) => (
            <Card
              key={certificado.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(certificado.status)}
                    <div>
                      <CardTitle className="text-lg">
                        {certificado.nome}
                      </CardTitle>
                      <CardDescription>
                        CNPJ: {certificado.cnpj}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(certificado.status)}>
                    {certificado.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Tipo:</span>
                    <p className="font-medium">{certificado.tipo}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Emissor:</span>
                    <p className="font-medium">{certificado.emissor}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Válido até:</span>
                    <p className="font-medium">
                      {new Date(certificado.validoAte).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Dias restantes:</span>
                    <p
                      className={`font-medium ${
                        certificado.diasRestantes <= 30
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {certificado.diasRestantes} dias
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Download className="h-4 w-4" />
                    Baixar
                  </Button>
                  <Button variant="outline" size="sm">
                    Renovar
                  </Button>
                  <Button variant="destructive" size="sm">
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
