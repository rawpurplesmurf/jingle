"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeadcountReports } from "@/components/reports/headcount-reports"
import { RecruitingReports } from "@/components/reports/recruiting-reports"
import { FinancialReports } from "@/components/reports/financial-reports"
import { TeamReports } from "@/components/reports/team-reports"
import { PortfolioReports } from "@/components/reports/portfolio-reports"
import { ReportFilters } from "@/components/reports/report-filters"

export function ReportsDashboard() {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
      </div>

      <ReportFilters onFilterChange={handleFilterChange} />

      <Tabs defaultValue="headcount" className="space-y-4">
        <TabsList>
          <TabsTrigger value="headcount">Headcount</TabsTrigger>
          <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="headcount" className="space-y-4">
          <HeadcountReports filters={filters} />
        </TabsContent>

        <TabsContent value="recruiting" className="space-y-4">
          <RecruitingReports filters={filters} />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <FinancialReports filters={filters} />
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <TeamReports filters={filters} />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioReports filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
