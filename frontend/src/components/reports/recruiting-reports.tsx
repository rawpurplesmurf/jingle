"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { RecruitingFunnelChart } from "@/components/reports/charts/recruiting-funnel-chart"
import { TimeToHireChart } from "@/components/reports/charts/time-to-hire-chart"
import { RecruitingPipelineChart } from "@/components/reports/charts/recruiting-pipeline-chart"
import { CandidateSourceChart } from "@/components/reports/charts/candidate-source-chart"
import { RecruitingByTeamChart } from "@/components/reports/charts/recruiting-by-team-chart"
import { RecruitingByRoleChart } from "@/components/reports/charts/recruiting-by-role-chart"
import { RecruitingMetricsTable } from "@/components/reports/tables/recruiting-metrics-table"
import { RecruitingPipelineTable } from "@/components/reports/tables/recruiting-pipeline-table"

interface RecruitingReportsProps {
  filters: any
}

export function RecruitingReports({ filters }: RecruitingReportsProps) {
  const [view, setView] = useState<"charts" | "tables">("charts")

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting report data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Recruiting Analytics</h2>
          <p className="text-muted-foreground">Recruiting performance metrics and pipeline analysis</p>
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
              <CardTitle>Recruiting Pipeline</CardTitle>
              <CardDescription>Current recruiting pipeline by stage</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RecruitingPipelineChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recruiting Funnel</CardTitle>
              <CardDescription>Conversion rates through stages</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RecruitingFunnelChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time to Hire</CardTitle>
              <CardDescription>Average days to fill positions</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <TimeToHireChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Sources</CardTitle>
              <CardDescription>Where candidates are coming from</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <CandidateSourceChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Team</CardTitle>
              <CardDescription>Recruiting activity by team</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RecruitingByTeamChart filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By Role Type</CardTitle>
              <CardDescription>Recruiting activity by role type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RecruitingByRoleChart filters={filters} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <RecruitingMetricsTable filters={filters} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Details</CardTitle>
              <CardDescription>Detailed view of recruiting pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <RecruitingPipelineTable filters={filters} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
