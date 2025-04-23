"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { PortfolioAllocationChart } from "@/components/reports/charts/portfolio-allocation-chart"
import { PortfolioGrowthChart } from "@/components/reports/charts/portfolio-growth-chart"
import { PortfolioInvestmentChart } from "@/components/reports/charts/portfolio-investment-chart"
import { PortfolioTeamAllocationChart } from "@/components/reports/charts/portfolio-team-allocation-chart"
import { PortfolioLevelDistributionChart } from "@/components/reports/charts/portfolio-level-distribution-chart"
import { PortfolioRoleTypeChart } from "@/components/reports/charts/portfolio-role-type-chart"
import { PortfolioAllocationTable } from "@/components/reports/tables/portfolio-allocation-table"
import { PortfolioInvestmentTable } from "@/components/reports/tables/portfolio-investment-table"

interface PortfolioReportsProps {
  filters: any
}

export function PortfolioReports({ filters }: PortfolioReportsProps) {
  const [view, setView] = useState<"charts" | "tables">("charts")

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting report data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Portfolio Analytics</h2>
          <p className="text-muted-foreground">Portfolio allocation, investment, and alignment analysis</p>
        </div>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={view} onValueChange={(v) => setView(v as "charts" | "tables")}>
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "charts" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Headcount allocation across portfolios</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioAllocationChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
              <CardDescription>Portfolio growth over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioGrowthChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Investment</CardTitle>
              <CardDescription>Financial investment by portfolio</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioInvestmentChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Allocation</CardTitle>
              <CardDescription>Team distribution across portfolios</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioTeamAllocationChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level Distribution</CardTitle>
              <CardDescription>Employee level distribution by portfolio</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioLevelDistributionChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Types</CardTitle>
              <CardDescription>Role type distribution by portfolio</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PortfolioRoleTypeChart filters={filters} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Detailed portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioAllocationTable filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Investment</CardTitle>
              <CardDescription>Financial investment by portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioInvestmentTable filters={filters} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
