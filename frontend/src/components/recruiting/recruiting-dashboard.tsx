"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecruitingKanbanBoard } from "./recruiting-kanban-board"
import { RecruitingTable } from "./recruiting-table"
import { RecruitingFilters } from "./recruiting-filters"
import { RecruitingMetrics } from "./recruiting-metrics"
import { getAllRecruitings } from "@/services/recruiting-service"
import type { Recruiting } from "@/types/recruiting"

export function RecruitingDashboard() {
  const router = useRouter()
  const [recruitings, setRecruitings] = useState<Recruiting[]>([])
  const [filteredRecruitings, setFilteredRecruitings] = useState<Recruiting[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<string>("kanban")

  useEffect(() => {
    const fetchRecruitings = async () => {
      try {
        const data = await getAllRecruitings()
        setRecruitings(data)
        setFilteredRecruitings(data)
      } catch (error) {
        console.error("Error fetching recruitings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecruitings()
  }, [])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecruitings(recruitings)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = recruitings.filter(
        (recruiting) =>
          recruiting.headcount.title.toLowerCase().includes(query) ||
          recruiting.status.toLowerCase().includes(query) ||
          recruiting.stage.toLowerCase().includes(query) ||
          recruiting.recruiter.name.toLowerCase().includes(query) ||
          recruiting.hiringManager.name.toLowerCase().includes(query),
      )
      setFilteredRecruitings(filtered)
    }
  }, [searchQuery, recruitings])

  // Handle filters
  const handleFilterChange = (filters: any) => {
    let filtered = [...recruitings]

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((recruiting) => filters.status.includes(recruiting.status))
    }

    if (filters.stage && filters.stage.length > 0) {
      filtered = filtered.filter((recruiting) => filters.stage.includes(recruiting.stage))
    }

    if (filters.recruiter && filters.recruiter.length > 0) {
      filtered = filtered.filter((recruiting) => filters.recruiter.includes(recruiting.recruiter._id))
    }

    if (filters.hiringManager && filters.hiringManager.length > 0) {
      filtered = filtered.filter((recruiting) => filters.hiringManager.includes(recruiting.hiringManager._id))
    }

    setFilteredRecruitings(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search recruitings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => router.push("/dashboard/recruiting/new")}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Recruiting
        </Button>
      </div>

      {showFilters && <RecruitingFilters onFilterChange={handleFilterChange} />}

      <RecruitingMetrics recruitings={filteredRecruitings} />

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <RecruitingKanbanBoard recruitings={filteredRecruitings} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table">
          <RecruitingTable recruitings={filteredRecruitings} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
