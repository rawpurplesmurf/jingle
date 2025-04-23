"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { PortfolioTable } from "@/components/portfolio/portfolio-table"
import { PortfolioFilters } from "@/components/portfolio/portfolio-filters"
import { PortfolioHierarchyView } from "@/components/portfolio/portfolio-hierarchy-view"
import { PortfolioDistributionChart } from "@/components/portfolio/portfolio-distribution-chart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { fetchPortfolios, fetchPortfolioHierarchy, fetchPortfolioDistribution } from "@/services/portfolio-service"
import type { Portfolio } from "@/types/portfolio"

export default function PortfolioPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [portfolioHierarchy, setPortfolioHierarchy] = useState<any[]>([])
  const [portfolioDistribution, setPortfolioDistribution] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [filters, setFilters] = useState({
    level: "",
    status: "",
    owner: "",
    parentPortfolio: "",
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
      loadPortfolios()

      if (activeView === "hierarchy") {
        loadPortfolioHierarchy()
      } else if (activeView === "distribution") {
        loadPortfolioDistribution()
      }
    }
  }, [isAuthenticated, filters, activeView])

  const loadPortfolios = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchPortfolios(filters)
      setPortfolios(data)
    } catch (error) {
      console.error("Failed to load portfolios:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const loadPortfolioHierarchy = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchPortfolioHierarchy()
      setPortfolioHierarchy(data)
    } catch (error) {
      console.error("Failed to load portfolio hierarchy:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const loadPortfolioDistribution = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchPortfolioDistribution()
      setPortfolioDistribution(data)
    } catch (error) {
      console.error("Failed to load portfolio distribution:", error)
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
              <h1 className="text-2xl font-bold tracking-tight">Portfolio Management</h1>
              <p className="text-muted-foreground">View and manage business portfolios across the organization</p>
            </div>
            <Link href="/dashboard/portfolio/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Portfolio
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="list" value={activeView} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <PortfolioFilters filters={filters} setFilters={setFilters} />

              {isLoadingData ? (
                <div className="flex h-64 w-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <PortfolioTable portfolios={portfolios} />
              )}
            </TabsContent>

            <TabsContent value="hierarchy" className="space-y-4">
              {isLoadingData ? (
                <div className="flex h-64 w-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <PortfolioHierarchyView hierarchy={portfolioHierarchy} />
              )}
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Headcount Distribution by Portfolio</CardTitle>
                  <CardDescription>Distribution of headcount across different portfolios</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  {isLoadingData ? (
                    <div className="flex h-64 w-full items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <PortfolioDistributionChart data={portfolioDistribution} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
