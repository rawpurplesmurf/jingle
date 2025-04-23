import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DistributionItem {
  _id: string
  name: string
  level: number
  count: number
  activeCount: number
  recruitingCount: number
  approvedCount: number
  preApprovalCount: number
}

interface PortfolioDistributionChartProps {
  distribution: DistributionItem[]
}

export function PortfolioDistributionChart({ distribution }: PortfolioDistributionChartProps) {
  // In a real app, this would use a charting library like recharts or chart.js
  // For simplicity, we'll just render a basic representation
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {distribution.map((item) => (
            <div key={item._id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.count} headcount</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${(item.activeCount / item.count) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Active: {item.activeCount}</span>
                <span>Recruiting: {item.recruitingCount}</span>
                <span>Approved: {item.approvedCount}</span>
                <span>Pre-approval: {item.preApprovalCount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PortfolioDistributionChart
