"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { TeamSizeChart } from "@/components/reports/charts/team-size-chart"
import { TeamGrowthChart } from "@/components/reports/charts/team-growth-chart"
import { TeamCompositionChart } from "@/components/reports/charts/team-composition-chart"
import { TeamLevelDistributionChart } from "@/components/reports/charts/team-level-distribution-chart"
import { TeamLocationChart } from "@/components/reports/charts/team-location-chart"
import { TeamRoleTypeChart } from "@/components/reports/charts/team-role-type-chart"
import { TeamStructureTable } from "@/components/reports/tables/team-structure-table"
import { TeamGrowthTable } from "@/components/reports/tables/team-growth-table"

interface TeamReportsProps {
  filters: any
}

export function TeamReports({ filters }: TeamReportsProps) {
  const [view, setView] = useState<"charts" | "tables">("charts")

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting report data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Team Analytics</h2>
          <p className="text-muted-foreground">Team structure, composition, and growth analysis</p>
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
              <CardTitle>Team Size Comparison</CardTitle>
              <CardDescription>Headcount by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamSizeChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Growth</CardTitle>
              <CardDescription>Team growth over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamGrowthChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Composition</CardTitle>
              <CardDescription>Employee type distribution by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamCompositionChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Level Distribution</CardTitle>
              <CardDescription>Employee level distribution by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamLevelDistributionChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Locations</CardTitle>
              <CardDescription>Geographical distribution by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamLocationChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Types</CardTitle>
              <CardDescription>Role type distribution by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TeamRoleTypeChart filters={filters} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Structure</CardTitle>
              <CardDescription>Detailed team composition</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamStructureTable filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Growth</CardTitle>
              <CardDescription>Historical and planned team growth</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamGrowthTable filters={filters} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
