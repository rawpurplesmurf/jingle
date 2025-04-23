"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeadcountSummaryTableProps {
  filters: any
}

export function HeadcountSummaryTable({ filters }: HeadcountSummaryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const data = [
    {
      team: "Frontend",
      active: 45,
      approved: 5,
      recruiting: 3,
      preApproval: 2,
      total: 55,
      fte: 42,
      contractor: 8,
      vendor: 5,
    },
    {
      team: "Backend",
      active: 38,
      approved: 4,
      recruiting: 2,
      preApproval: 3,
      total: 47,
      fte: 35,
      contractor: 10,
      vendor: 2,
    },
    {
      team: "Design",
      active: 22,
      approved: 2,
      recruiting: 1,
      preApproval: 1,
      total: 26,
      fte: 20,
      contractor: 4,
      vendor: 2,
    },
    {
      team: "QA",
      active: 18,
      approved: 2,
      recruiting: 2,
      preApproval: 0,
      total: 22,
      fte: 15,
      contractor: 5,
      vendor: 2,
    },
    {
      team: "DevOps",
      active: 15,
      approved: 1,
      recruiting: 1,
      preApproval: 1,
      total: 18,
      fte: 12,
      contractor: 4,
      vendor: 2,
    },
    {
      team: "Product",
      active: 12,
      approved: 1,
      recruiting: 0,
      preApproval: 2,
      total: 15,
      fte: 12,
      contractor: 2,
      vendor: 1,
    },
  ]

  // Filter data based on search term
  const filteredData = data.filter((item) => item.team.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate totals
  const totals = {
    active: filteredData.reduce((sum, item) => sum + item.active, 0),
    approved: filteredData.reduce((sum, item) => sum + item.approved, 0),
    recruiting: filteredData.reduce((sum, item) => sum + item.recruiting, 0),
    preApproval: filteredData.reduce((sum, item) => sum + item.preApproval, 0),
    total: filteredData.reduce((sum, item) => sum + item.total, 0),
    fte: filteredData.reduce((sum, item) => sum + item.fte, 0),
    contractor: filteredData.reduce((sum, item) => sum + item.contractor, 0),
    vendor: filteredData.reduce((sum, item) => sum + item.vendor, 0),
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
              <TableHead className="text-right">Active</TableHead>
              <TableHead className="text-right">Approved</TableHead>
              <TableHead className="text-right">Recruiting</TableHead>
              <TableHead className="text-right">Pre-Approval</TableHead>
              <TableHead className="text-right font-bold">Total</TableHead>
              <TableHead className="text-right">FTE</TableHead>
              <TableHead className="text-right">Contractor</TableHead>
              <TableHead className="text-right">Vendor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.team}>
                <TableCell className="font-medium">{item.team}</TableCell>
                <TableCell className="text-right">{item.active}</TableCell>
                <TableCell className="text-right">{item.approved}</TableCell>
                <TableCell className="text-right">{item.recruiting}</TableCell>
                <TableCell className="text-right">{item.preApproval}</TableCell>
                <TableCell className="text-right font-bold">{item.total}</TableCell>
                <TableCell className="text-right">{item.fte}</TableCell>
                <TableCell className="text-right">{item.contractor}</TableCell>
                <TableCell className="text-right">{item.vendor}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">{totals.active}</TableCell>
              <TableCell className="text-right font-bold">{totals.approved}</TableCell>
              <TableCell className="text-right font-bold">{totals.recruiting}</TableCell>
              <TableCell className="text-right font-bold">{totals.preApproval}</TableCell>
              <TableCell className="text-right font-bold">{totals.total}</TableCell>
              <TableCell className="text-right font-bold">{totals.fte}</TableCell>
              <TableCell className="text-right font-bold">{totals.contractor}</TableCell>
              <TableCell className="text-right font-bold">{totals.vendor}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
