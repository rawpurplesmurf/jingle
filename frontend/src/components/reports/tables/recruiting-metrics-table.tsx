"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { Input } from "@/components/ui/input"

interface RecruitingMetricsTableProps {
  filters: any
}

export function RecruitingMetricsTable({ filters }: RecruitingMetricsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const data = [
    {
      team: "Frontend",
      openPositions: 8,
      activeCandidates: 35,
      interviews: 22,
      offers: 3,
      acceptedOffers: 2,
      timeToHire: 45,
      fillRate: 75,
    },
    {
      team: "Backend",
      openPositions: 6,
      activeCandidates: 28,
      interviews: 18,
      offers: 2,
      acceptedOffers: 2,
      timeToHire: 52,
      fillRate: 80,
    },
    {
      team: "Design",
      openPositions: 3,
      activeCandidates: 18,
      interviews: 12,
      offers: 1,
      acceptedOffers: 1,
      timeToHire: 38,
      fillRate: 90,
    },
    {
      team: "QA",
      openPositions: 4,
      activeCandidates: 22,
      interviews: 15,
      offers: 2,
      acceptedOffers: 1,
      timeToHire: 42,
      fillRate: 70,
    },
    {
      team: "DevOps",
      openPositions: 2,
      activeCandidates: 15,
      interviews: 10,
      offers: 1,
      acceptedOffers: 1,
      timeToHire: 48,
      fillRate: 85,
    },
    {
      team: "Product",
      openPositions: 1,
      activeCandidates: 12,
      interviews: 8,
      offers: 1,
      acceptedOffers: 0,
      timeToHire: 0,
      fillRate: 0,
    },
  ]

  // Filter data based on search term
  const filteredData = data.filter((item) => item.team.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate averages
  const averages = {
    openPositions: Math.round(filteredData.reduce((sum, item) => sum + item.openPositions, 0) / filteredData.length),
    activeCandidates: Math.round(
      filteredData.reduce((sum, item) => sum + item.activeCandidates, 0) / filteredData.length,
    ),
    interviews: Math.round(filteredData.reduce((sum, item) => sum + item.interviews, 0) / filteredData.length),
    offers: Math.round(filteredData.reduce((sum, item) => sum + item.offers, 0) / filteredData.length),
    acceptedOffers: Math.round(filteredData.reduce((sum, item) => sum + item.acceptedOffers, 0) / filteredData.length),
    timeToHire: Math.round(
      filteredData.reduce((sum, item) => sum + (item.timeToHire || 0), 0) /
        filteredData.filter((item) => item.timeToHire > 0).length,
    ),
    fillRate: Math.round(
      filteredData.reduce((sum, item) => sum + item.fillRate, 0) /
        filteredData.filter((item) => item.fillRate > 0).length,
    ),
  }

  const handleExport = () => {
    // In a real app, this would trigger a CSV or Excel export
    alert("Exporting table data...")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExport}>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExport}>Export as Excel</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExport}>Export as PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Team</TableHead>
              <TableHead className="text-right">Open Positions</TableHead>
              <TableHead className="text-right">Active Candidates</TableHead>
              <TableHead className="text-right">Interviews</TableHead>
              <TableHead className="text-right">Offers</TableHead>
              <TableHead className="text-right">Accepted Offers</TableHead>
              <TableHead className="text-right">Time to Hire (days)</TableHead>
              <TableHead className="text-right">Fill Rate (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.team}>
                <TableCell className="font-medium">{item.team}</TableCell>
                <TableCell className="text-right">{item.openPositions}</TableCell>
                <TableCell className="text-right">{item.activeCandidates}</TableCell>
                <TableCell className="text-right">{item.interviews}</TableCell>
                <TableCell className="text-right">{item.offers}</TableCell>
                <TableCell className="text-right">{item.acceptedOffers}</TableCell>
                <TableCell className="text-right">{item.timeToHire || "-"}</TableCell>
                <TableCell className="text-right">{item.fillRate || "-"}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="font-bold">Average</TableCell>
              <TableCell className="text-right font-bold">{averages.openPositions}</TableCell>
              <TableCell className="text-right font-bold">{averages.activeCandidates}</TableCell>
              <TableCell className="text-right font-bold">{averages.interviews}</TableCell>
              <TableCell className="text-right font-bold">{averages.offers}</TableCell>
              <TableCell className="text-right font-bold">{averages.acceptedOffers}</TableCell>
              <TableCell className="text-right font-bold">{averages.timeToHire}</TableCell>
              <TableCell className="text-right font-bold">{averages.fillRate}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
