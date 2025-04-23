"use client"

import { useMemo } from "react"
import { Users, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Recruiting } from "@/types/recruiting"

interface RecruitingMetricsProps {
  recruitings: Recruiting[]
}

export function RecruitingMetrics({ recruitings }: RecruitingMetricsProps) {
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalPositions = recruitings.length
    const openPositions = recruitings.filter((r) => r.status === "open").length
    const filledPositions = recruitings.filter((r) => r.status === "closed_filled").length
    const cancelledPositions = recruitings.filter((r) => r.status === "closed_cancelled").length

    // Calculate average time to fill (in days) for filled positions
    let totalDaysToFill = 0
    let filledCount = 0

    recruitings.forEach((recruiting) => {
      if (recruiting.status === "closed_filled" && recruiting.actualCloseDate && recruiting.openDate) {
        const openDate = new Date(recruiting.openDate)
        const closeDate = new Date(recruiting.actualCloseDate)
        const daysToFill = Math.floor((closeDate.getTime() - openDate.getTime()) / (1000 * 60 * 60 * 24))
        totalDaysToFill += daysToFill
        filledCount++
      }
    })

    const avgTimeToFill = filledCount > 0 ? Math.round(totalDaysToFill / filledCount) : 0

    // Calculate total candidates
    let totalCandidates = 0
    let activeCandidates = 0
    let hiredCandidates = 0

    recruitings.forEach((recruiting) => {
      totalCandidates += recruiting.candidates.length
      activeCandidates += recruiting.candidates.filter((c) => c.status === "active").length
      hiredCandidates += recruiting.candidates.filter((c) => c.status === "hired").length
    })

    return {
      totalPositions,
      openPositions,
      filledPositions,
      cancelledPositions,
      avgTimeToFill,
      totalCandidates,
      activeCandidates,
      hiredCandidates,
    }
  }, [recruitings])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.openPositions}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((metrics.openPositions / metrics.totalPositions) * 100) || 0}% of total positions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Time to Fill</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.avgTimeToFill} days</div>
          <p className="text-xs text-muted-foreground">Based on {metrics.filledPositions} filled positions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeCandidates}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((metrics.activeCandidates / metrics.totalCandidates) * 100) || 0}% of total candidates
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.totalCandidates > 0 ? Math.round((metrics.hiredCandidates / metrics.totalCandidates) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics.hiredCandidates} hired out of {metrics.totalCandidates} candidates
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
