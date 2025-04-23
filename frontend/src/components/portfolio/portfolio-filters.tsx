"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface PortfolioFiltersProps {
  onFilterChange: (filters: any) => void
}

export function PortfolioFilters({ onFilterChange }: PortfolioFiltersProps) {
  const [filters, setFilters] = React.useState({
    search: "",
    level: "",
    status: "",
    owner: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      search: "",
      level: "",
      status: "",
      owner: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Input
          placeholder="Search portfolios..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-40">
        <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="1">L1</SelectItem>
            <SelectItem value="2">L2</SelectItem>
            <SelectItem value="3">L3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-40">
        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}

export default PortfolioFilters
