export interface Integration {
  id: string
  name: string
  type: "marketplace" | "payment" | "logistics"
  status: "connected" | "disconnected" | "pending"
  config: Record<string, any>
  lastSync?: string
}

export const integrationsService = {
  async getAll(): Promise<Integration[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "mercadolivre",
            name: "Mercado Livre",
            type: "marketplace",
            status: "connected",
            config: { apiKey: "***", secretKey: "***" },
            lastSync: "2024-01-15T10:30:00Z",
          },
          {
            id: "shopee",
            name: "Shopee",
            type: "marketplace",
            status: "connected",
            config: { apiKey: "***", secretKey: "***" },
            lastSync: "2024-01-15T09:15:00Z",
          },
        ])
      }, 1000)
    })
  },

  async connect(integrationId: string, config: Record<string, any>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Connecting to ${integrationId} with config:`, config)
        resolve()
      }, 2000)
    })
  },

  async disconnect(integrationId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Disconnecting from ${integrationId}`)
        resolve()
      }, 1000)
    })
  },

  async sync(integrationId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Syncing ${integrationId}`)
        resolve()
      }, 3000)
    })
  },
}
