export interface NFCe {
  id: string
  numero: string
  cliente: string
  valor: number
  status: "autorizada" | "pendente" | "cancelada"
  data: string
  chave?: string
  items: FiscalItem[]
}

export interface NFe {
  id: string
  numero: string
  cliente: string
  cnpj?: string
  valor: number
  status: "autorizada" | "pendente" | "cancelada"
  data: string
  chave?: string
  items: FiscalItem[]
}

export interface FiscalItem {
  id: string
  produto: string
  quantidade: number
  preco: number
  total: number
}

export const fiscalService = {
  async getNFCeList(): Promise<NFCe[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            numero: "000001",
            cliente: "João Silva",
            valor: 150.0,
            status: "autorizada",
            data: "2024-01-15",
            chave: "35240114200166000187650010000000011234567890",
            items: [{ id: "1", produto: "Camiseta", quantidade: 2, preco: 75.0, total: 150.0 }],
          },
        ])
      }, 1000)
    })
  },

  async getNFeList(): Promise<NFe[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            numero: "000001",
            cliente: "Empresa ABC Ltda",
            cnpj: "12.345.678/0001-90",
            valor: 2500.0,
            status: "autorizada",
            data: "2024-01-15",
            chave: "35240114200166000187550010000000011234567890",
            items: [{ id: "1", produto: "Notebook", quantidade: 1, preco: 2500.0, total: 2500.0 }],
          },
        ])
      }, 1000)
    })
  },

  async emitNFCe(data: Omit<NFCe, "id" | "status" | "chave">): Promise<NFCe> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          status: "pendente",
          chave: `35240114200166000187650010000000${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}1234567890`,
        })
      }, 2000)
    })
  },

  async emitNFe(data: Omit<NFe, "id" | "status" | "chave">): Promise<NFe> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          status: "pendente",
          chave: `35240114200166000187550010000000${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}1234567890`,
        })
      }, 2000)
    })
  },

  async cancelNF(id: string, type: "nfce" | "nfe"): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Canceling ${type.toUpperCase()} ${id}`)
        resolve()
      }, 1500)
    })
  },
}
