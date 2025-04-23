"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getAllUsers } from "@/services/user-service"
import type { User } from "@/types/user"

interface RecruitingFiltersProps {
  onFilterChange: (filters: any) => void
}

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "on_hold", label: "On Hold" },
  { value: "closed_filled", label: "Closed (Filled)" },
  { value: "closed_cancelled", label: "Closed (Cancelled)" },
]

const stageOptions = [
  { value: "triage", label: "Triage" },
  { value: "sourcing", label: "Sourcing" },
  { value: "screening", label: "Screening" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "closed", label: "Closed" },
]

export function RecruitingFilters({ onFilterChange }: RecruitingFiltersProps) {
  const [status, setStatus] = useState<string[]>([])
  const [stage, setStage] = useState<string[]>([])
  const [recruiter, setRecruiter] = useState<string[]>([])
  const [hiringManager, setHiringManager] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [openStatus, setOpenStatus] = useState(false)
  const [openStage, setOpenStage] = useState(false)
  const [openRecruiter, setOpenRecruiter] = useState(false)
  const [openHiringManager, setOpenHiringManager] = useState(false)

  // Fetch users for recruiter and hiring manager filters
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  // Update filters when selections change
  useEffect(() => {
    onFilterChange({
      status,
      stage,
      recruiter,
      hiringManager,
    })
  }, [status, stage, recruiter, hiringManager, onFilterChange])

  // Reset all filters
  const resetFilters = () => {
    setStatus([])
    setStage([])
    setRecruiter([])
    setHiringManager([])
  }

  // Count active filters
  const activeFilterCount = status.length + stage.length + recruiter.length + hiringManager.length

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-sm font-medium">Filters</h3>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset filters ({activeFilterCount})
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <Popover open={openStatus} onOpenChange={setOpenStatus}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Status
                {status.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {status.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statusOptions.map((option) => {
                      const isSelected = status.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setStatus(status.filter((s) => s !== option.value))
                            } else {
                              setStatus([...status, option.value])
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

          {/* Stage Filter */}
          <Popover open={openStage} onOpenChange={setOpenStage}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Stage
                {stage.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {stage.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search stage..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {stageOptions.map((option) => {
                      const isSelected = stage.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              setStage(stage.filter((s) => s !== option.value))
                            } else {
                              setStage([...stage, option.value])
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

          {/* Recruiter Filter */}
          <Popover open={openRecruiter} onOpenChange={setOpenRecruiter}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Recruiter
                {recruiter.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {recruiter.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search recruiters..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => {
                      const isSelected = recruiter.includes(user._id)
                      return (
                        <CommandItem
                          key={user._id}
                          onSelect={() => {
                            if (isSelected) {
                              setRecruiter(recruiter.filter((r) => r !== user._id))
                            } else {
                              setRecruiter([...recruiter, user._id])
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
                          <span>{user.name}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Hiring Manager Filter */}
          <Popover open={openHiringManager} onOpenChange={setOpenHiringManager}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                Hiring Manager
                {hiringManager.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                    {hiringManager.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search hiring managers..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => {
                      const isSelected = hiringManager.includes(user._id)
                      return (
                        <CommandItem
                          key={user._id}
                          onSelect={() => {
                            if (isSelected) {
                              setHiringManager(hiringManager.filter((h) => h !== user._id))
                            } else {
                              setHiringManager([...hiringManager, user._id])
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
                          <span>{user.name}</span>
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
              {status.map((s) => (
                <Badge key={s} variant="secondary" className="px-2 py-1">
                  {statusOptions.find((o) => o.value === s)?.label || s}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setStatus(status.filter((item) => item !== s))}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {stage.map((s) => (
                <Badge key={s} variant="secondary" className="px-2 py-1">
                  {stageOptions.find((o) => o.value === s)?.label || s}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setStage(stage.filter((item) => item !== s))}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {recruiter.map((r) => (
                <Badge key={r} variant="secondary" className="px-2 py-1">
                  {users.find((u) => u._id === r)?.name || r}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setRecruiter(recruiter.filter((item) => item !== r))}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {hiringManager.map((h) => (
                <Badge key={h} variant="secondary" className="px-2 py-1">
                  {users.find((u) => u._id === h)?.name || h}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setHiringManager(hiringManager.filter((item) => item !== h))}
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
