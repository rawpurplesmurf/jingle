"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BudgetVsActualChart } from "@/components/reports/charts/budget-vs-actual-chart"
import { HeadcountCostChart } from "@/components/reports/charts/headcount-cost-chart"
import { CostByTeamChart } from "@/components/reports/charts/cost-by-team-chart"
import { CostByPortfolioChart } from "@/components/reports/charts/cost-by-portfolio-chart"
import { CostTrendChart } from "@/components/reports/charts/cost-trend-chart"
import { CostByTypeChart } from "@/components/reports/charts/cost-by-type-chart"
import { FinancialSummaryTable } from "@/components/reports/tables/financial-summary-table"
import { BudgetAllocationTable } from "@/components/reports/tables/budget-allocation-table"

interface FinancialReportsProps {
  filters: any
}

export function FinancialReports({ filters }: FinancialReportsProps) {
  const [view, setView] = useState<"charts" | "tables">("charts")

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting report data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Financial Analytics</h2>
          <p className="text-muted-foreground">Headcount cost analysis and budget tracking</p>
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
              <CardTitle>Budget vs. Actual</CardTitle>
              <CardDescription>Comparison of planned vs. actual headcount costs</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BudgetVsActualChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Headcount Cost</CardTitle>
              <CardDescription>Total cost breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountCostChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost by Team</CardTitle>
              <CardDescription>Headcount cost by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <CostByTeamChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost by Portfolio</CardTitle>
              <CardDescription>Headcount cost by portfolio</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <CostByPortfolioChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Trend</CardTitle>
              <CardDescription>Monthly headcount cost trend</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <CostTrendChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost by Type</CardTitle>
              <CardDescription>Cost by employee type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <CostByTypeChart filters={filters} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Headcount cost summary</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialSummaryTable filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Detailed budget allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetAllocationTable filters={filters} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
