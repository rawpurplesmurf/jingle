"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { HeadcountTrendChart } from "@/components/reports/charts/headcount-trend-chart"
import { HeadcountByTeamChart } from "@/components/reports/charts/headcount-by-team-chart"
import { HeadcountByPortfolioChart } from "@/components/reports/charts/headcount-by-portfolio-chart"
import { HeadcountByLevelChart } from "@/components/reports/charts/headcount-by-level-chart"
import { HeadcountByTypeChart } from "@/components/reports/charts/headcount-by-type-chart"
import { HeadcountByLocationChart } from "@/components/reports/charts/headcount-by-location-chart"
import { HeadcountSummaryTable } from "@/components/reports/tables/headcount-summary-table"
import { HeadcountGrowthTable } from "@/components/reports/tables/headcount-growth-table"

interface HeadcountReportsProps {
  filters: any
}

export function HeadcountReports({ filters }: HeadcountReportsProps) {
  const [view, setView] = useState<"charts" | "tables">("charts")

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting report data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Headcount Analytics</h2>
          <p className="text-muted-foreground">Comprehensive view of headcount distribution and trends</p>
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
              <CardTitle>Headcount Trend</CardTitle>
              <CardDescription>Monthly headcount changes over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountTrendChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Employee Type</CardTitle>
              <CardDescription>Distribution by employment type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountByTypeChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Team</CardTitle>
              <CardDescription>Headcount distribution by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountByTeamChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Portfolio</CardTitle>
              <CardDescription>Headcount distribution by portfolio</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountByPortfolioChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Level</CardTitle>
              <CardDescription>Headcount distribution by level</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountByLevelChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Location</CardTitle>
              <CardDescription>Geographical distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <HeadcountByLocationChart filters={filters} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Headcount Summary</CardTitle>
              <CardDescription>Current headcount breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <HeadcountSummaryTable filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Headcount Growth</CardTitle>
              <CardDescription>Monthly changes in headcount</CardDescription>
            </CardHeader>
            <CardContent>
              <HeadcountGrowthTable filters={filters} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
