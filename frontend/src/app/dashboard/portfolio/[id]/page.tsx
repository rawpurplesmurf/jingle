"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { PortfolioHeadcountTable } from "@/components/portfolio/portfolio-headcount-table"
import { PortfolioSubportfoliosTable } from "@/components/portfolio/portfolio-subportfolios-table"
import { PortfolioTeamsTable } from "@/components/portfolio/portfolio-teams-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Edit, Loader2, Users, Briefcase, Home } from "lucide-react"
import Link from "next/link"
import { fetchPortfolioById } from "@/services/portfolio-service"

export default function PortfolioDetailPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const portfolioId = params.id as string

  const [isMounted, setIsMounted] = useState(false)
  const [portfolio, setPortfolio] = useState<any>(null)
  const [subPortfolios, setSubPortfolios] = useState<any[]>([])
  const [alignedTeams, setAlignedTeams] = useState<any[]>([])
  const [headcounts, setHeadcounts] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated && portfolioId) {
      loadPortfolioDetails()
    }
  }, [isAuthenticated, portfolioId])

  const loadPortfolioDetails = async () => {
    setIsLoadingData(true)
    try {
      const data = await fetchPortfolioById(portfolioId)
      setPortfolio(data.portfolio)
      setSubPortfolios(data.subPortfolios || [])
      setAlignedTeams(data.alignedTeams || [])
      setHeadcounts(data.headcounts || [])
    } catch (error) {
      console.error("Failed to load portfolio details:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "planned":
        return "outline"
      default:
        return "default"
    }
  }

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "L1":
        return "default"
      case "L2":
        return "secondary"
      case "L3":
        return "outline"
      default:
        return "default"
    }
  }

  if (!isMounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isLoadingData || !portfolio) {
    return (
      <div className="flex h-screen w-full flex-col">
        <DashboardHeader user={user} />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto bg-muted/40 p-4">
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4">
          <div className="mb-6">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/portfolio">Portfolios</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{portfolio.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight">{portfolio.name}</h1>
                <Badge variant={getLevelBadgeVariant(portfolio.level)}>{portfolio.level}</Badge>
                <Badge variant={getStatusBadgeVariant(portfolio.status)}>{portfolio.status}</Badge>
              </div>
              <Link href={`/dashboard/portfolio/${portfolioId}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Portfolio
                </Button>
              </Link>
            </div>
            <p className="mt-1 text-muted-foreground">{portfolio.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Portfolio Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Owner</dt>
                    <dd className="text-sm">{portfolio.owner?.name || "Not assigned"}</dd>
                  </div>
                  {portfolio.parentPortfolio && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Parent Portfolio</dt>
                      <dd className="text-sm">
                        <Link
                          href={`/dashboard/portfolio/${portfolio.parentPortfolio._id}`}
                          className="hover:underline"
                        >
                          {portfolio.parentPortfolio.name} ({portfolio.parentPortfolio.level})
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Priority</dt>
                    <dd className="text-sm">{portfolio.priority || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                    <dd className="text-sm">{new Date(portfolio.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                    <dd className="text-sm">{new Date(portfolio.updatedAt).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs font-medium text-muted-foreground">Headcount</div>
                    <div className="mt-1 flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="text-xl font-bold">{headcounts.length}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs font-medium text-muted-foreground">Sub-Portfolios</div>
                    <div className="mt-1 flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="text-xl font-bold">{subPortfolios.length}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs font-medium text-muted-foreground">Aligned Teams</div>
                    <div className="mt-1 flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="text-xl font-bold">{alignedTeams.length}</div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs font-medium text-muted-foreground">Open Positions</div>
                    <div className="mt-1 flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="text-xl font-bold">
                        {headcounts.filter((h) => h.status === "recruiting" || h.status === "approved").length}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="headcount" className="space-y-4">
              <TabsList>
                <TabsTrigger value="headcount">Headcount</TabsTrigger>
                <TabsTrigger value="subportfolios">Sub-Portfolios</TabsTrigger>
                <TabsTrigger value="teams">Aligned Teams</TabsTrigger>
              </TabsList>

              <TabsContent value="headcount">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Headcount</CardTitle>
                    <CardDescription>All headcount positions assigned to this portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PortfolioHeadcountTable headcounts={headcounts} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subportfolios">
                <Card>
                  <CardHeader>
                    <CardTitle>Sub-Portfolios</CardTitle>
                    <CardDescription>Portfolios that are part of this portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PortfolioSubportfoliosTable subPortfolios={subPortfolios} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams">
                <Card>
                  <CardHeader>
                    <CardTitle>Aligned Teams</CardTitle>
                    <CardDescription>Teams aligned to this portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PortfolioTeamsTable teams={alignedTeams} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
