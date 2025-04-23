"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TeamTable } from "@/components/teams/team-table"
import { TeamFilters } from "@/components/teams/team-filters"
import { TeamHierarchyView } from "@/components/teams/team-hierarchy-view"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { fetchTeams, fetchTeamHierarchy } from "@/services/team-service"
import type { Team } from "@/types/team"

export default function TeamsPageClient() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [teamHierarchy, setTeamHierarchy] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [filters, setFilters] = useState({
    status: "",
    manager: "",
    parentTeam: "",
  })
  const [activeView, setActiveView] = useState("list")

  useEffect(() => {
    setIsMounted(true)

    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadTeams()
      if (activeView === "hierarchy") {
        loadTeamHierarchy()
      }
    }
  }, [isAuthenticated, filters, activeView])

  const loadTeams = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchTeams(filters)
      setTeams(data)
    } catch (error) {
      console.error("Failed to load teams:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const loadTeamHierarchy = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchTeamHierarchy()
      setTeamHierarchy(data)
    } catch (error) {
      console.error("Failed to load team hierarchy:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveView(value)
  }

  if (!isMounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
              <p className="text-muted-foreground">View and manage teams across the organization</p>
            </div>
            <Link href="/dashboard/teams/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Team
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="list" value={activeView} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <TeamFilters filters={filters} setFilters={setFilters} />

              {isLoadingData ? (
                <div className="flex h-64 w-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <TeamTable teams={teams} />
              )}
            </TabsContent>

            <TabsContent value="hierarchy" className="space-y-4">
              {isLoadingData ? (
                <div className="flex h-64 w-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <TeamHierarchyView hierarchy={teamHierarchy} />
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
