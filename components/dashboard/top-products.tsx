import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const topProducts = [
  {
    name: "Produto Premium A",
    sales: 145,
    revenue: "R$ 28.500",
    growth: "+12%",
    progress: 85,
  },
  {
    name: "Serviço Consultoria",
    sales: 89,
    revenue: "R$ 22.300",
    growth: "+8%",
    progress: 65,
  },
  {
    name: "Produto Standard B",
    sales: 67,
    revenue: "R$ 15.800",
    growth: "+15%",
    progress: 45,
  },
  {
    name: "Pacote Enterprise",
    sales: 34,
    revenue: "R$ 12.100",
    growth: "-3%",
    progress: 25,
  },
]

export function TopProducts() {
  return (
    <Card className="elevation-1">
      <CardHeader>
        <CardTitle>Produtos Mais Vendidos</CardTitle>
        <CardDescription>Ranking dos produtos com melhor performance este mês</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {topProducts.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} vendas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{product.revenue}</p>
                <Badge variant={product.growth.startsWith("+") ? "default" : "destructive"} className="text-xs">
                  {product.growth}
                </Badge>
              </div>
            </div>
            <Progress value={product.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
