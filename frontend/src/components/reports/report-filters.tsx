"use client"

import { useState, useEffect } from "react"
import { Check, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ReportFiltersProps {
  onFilterChange: (filters: any) => void
}

export function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [portfolios, setPortfolios] = useState<string[]>([])
  const [teams, setTeams] = useState<string[]>([])
  const [employeeTypes, setEmployeeTypes] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])

  const [openPortfolios, setOpenPortfolios] = useState(false)
  const [openTeams, setOpenTeams] = useState(false)
  const [openEmployeeTypes, setOpenEmployeeTypes] = useState(false)
  const [openStatuses, setOpenStatuses] = useState(false)
  const [openDateRange, setOpenDateRange] = useState(false)

  // Mock data for filters
  const portfolioOptions = [
    { value: "portfolio1", label: "Product Development" },
    { value: "portfolio2", label: "Marketing" },
    { value: "portfolio3", label: "Sales" },
    { value: "portfolio4", label: "Customer Support" },
    { value: "portfolio5", label: "Operations" },
  ]

  const teamOptions = [
    { value: "team1", label: "Frontend" },
    { value: "team2", label: "Backend" },
    { value: "team3", label: "Design" },
    { value: "team4", label: "QA" },
    { value: "team5", label: "DevOps" },
  ]

  const employeeTypeOptions = [
    { value: "fte", label: "Full-time" },
    { value: "contractor", label: "Contractor" },
    { value: "vendor", label: "Vendor" },
    { value: "intern", label: "Intern" },
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "approved", label: "Approved" },
    { value: "pre_approval", label: "Pre-approval" },
    { value: "recruiting", label: "Recruiting" },
    { value: "on_hold", label: "On Hold" },
    { value: "closed", label: "Closed" },
  ]

  // Update filters when selections change
  useEffect(() => {
    onFilterChange({
      dateRange,
      portfolios,
      teams,
      employeeTypes,
      statuses,
    })
  }, [dateRange, portfolios, teams, employeeTypes, statuses, onFilterChange])

  // Reset all filters
  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined })
    setPortfolios([])
    setTeams([])
    setEmployeeTypes([])
    setStatuses([])
  }

  // Count active filters
  const activeFilterCount =
    (dateRange.from || dateRange.to ? 1 : 0) + portfolios.length + teams.length + employeeTypes.length + statuses.length

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-sm font-medium">Report Filters</h3>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset filters ({activeFilterCount})
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Date Range Filter */}
          <Popover open={openDateRange} onOpenChange={setOpenDateRange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 border-dashed justify-start text-left font-normal",
                  !dateRange.from && !dateRange.to && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Portfolio Filter */}
          <Popover open={openPortfolios} onOpenChange={setOpenPortfolios}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Portfolio
                {portfolios.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {portfolios.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search portfolios..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {portfolioOptions.map((option) => {
                      const isSelected = portfolios.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setPortfolios(portfolios.filter((p) => p !== option.value))
                            } else {
                              setPortfolios([...portfolios, option.value])
                            }
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Team Filter */}
          <Popover open={openTeams} onOpenChange={setOpenTeams}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Team
                {teams.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {teams.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search teams..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {teamOptions.map((option) => {
                      const isSelected = teams.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setTeams(teams.filter((t) => t !== option.value))
                            } else {
                              setTeams([...teams, option.value])
                            }
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Employee Type Filter */}
          <Popover open={openEmployeeTypes} onOpenChange={setOpenEmployeeTypes}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Employee Type
                {employeeTypes.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {employeeTypes.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search employee types..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {employeeTypeOptions.map((option) => {
                      const isSelected = employeeTypes.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setEmployeeTypes(employeeTypes.filter((e) => e !== option.value))
                            } else {
                              setEmployeeTypes([...employeeTypes, option.value])
                            }
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Status Filter */}
          <Popover open={openStatuses} onOpenChange={setOpenStatuses}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Status
                {statuses.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {statuses.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search statuses..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statusOptions.map((option) => {
                      const isSelected = statuses.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setStatuses(statuses.filter((s) => s !== option.value))
                            } else {
                              setStatuses([...statuses, option.value])
                            }
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{option.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-2">
              {dateRange.from && (
                <Badge variant="secondary" className="px-2 py-1">
                  {dateRange.to
                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                    : `From ${format(dateRange.from, "MMM d, yyyy")}`}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setDateRange({ from: undefined, to: undefined })}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {portfolios.map((p) => (
                <Badge key={p} variant="secondary" className="px-2 py-1">
                  {portfolioOptions.find((o) => o.value === p)?.label || p}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setPortfolios(portfolios.filter((item) => item !== p))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {teams.map((t) => (
                <Badge key={t} variant="secondary" className="px-2 py-1">
                  {teamOptions.find((o) => o.value === t)?.label || t}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setTeams(teams.filter((item) => item !== t))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {employeeTypes.map((e) => (
                <Badge key={e} variant="secondary" className="px-2 py-1">
                  {employeeTypeOptions.find((o) => o.value === e)?.label || e}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setEmployeeTypes(employeeTypes.filter((item) => item !== e))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {statuses.map((s) => (
                <Badge key={s} variant="secondary" className="px-2 py-1">
                  {statusOptions.find((o) => o.value === s)?.label || s}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setStatuses(statuses.filter((item) => item !== s))}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
