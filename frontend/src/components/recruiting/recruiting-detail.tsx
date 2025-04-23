"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { getRecruitingById, updateRecruitingStage } from "@/services/recruiting-service"

export function RecruitingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [recruiting, setRecruiting] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecruitingById(id)
        setRecruiting(data)
      } catch (error) {
        console.error("Error fetching recruiting details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleStageChange = async (stage: string) => {
    try {
      const updated = await updateRecruitingStage(id, stage)
      setRecruiting(updated)
    } catch (error) {
      console.error("Error updating stage:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!recruiting) {
    return <div>Recruiting not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{recruiting.headcount?.title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/recruiting/${id}/edit`)}>
            Edit
          </Button>
          <Button variant="outline" onClick={() => router.push(`/dashboard/recruiting/${id}/candidates/new`)}>
            Add Candidate
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recruiting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="font-medium">{recruiting.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stage</p>
                <p className="font-medium">{recruiting.stage}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Date</p>
                <p className="font-medium">{formatDate(recruiting.openDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target Close Date</p>
                <p className="font-medium">{formatDate(recruiting.targetCloseDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recruiter</p>
                <p className="font-medium">{recruiting.recruiter?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hiring Manager</p>
                <p className="font-medium">{recruiting.hiringManager?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Headcount Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Title</p>
                <p className="font-medium">{recruiting.headcount?.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Level</p>
                <p className="font-medium">{recruiting.headcount?.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team</p>
                <p className="font-medium">{recruiting.headcount?.team?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-medium">{recruiting.headcount?.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidates</CardTitle>
          <CardDescription>{recruiting.candidates?.length || 0} candidates in pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="withdrawn">Withdrawn</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              {recruiting.candidates?.length === 0 ? (
                <p className="text-center text-muted-foreground">No candidates yet</p>
              ) : (
                <div className="space-y-4">
                  {recruiting.candidates?.map((candidate: any) => (
                    <div key={candidate._id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            candidate.stage === "offer_accepted"
                              ? "bg-green-100 text-green-800"
                              : candidate.stage === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {candidate.stage.replace("_", " ")}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/recruiting/${id}/candidates/${candidate._id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              {recruiting.candidates?.filter((c: any) => c.status === "active").length === 0 ? (
                <p className="text-center text-muted-foreground">No active candidates</p>
              ) : (
                <div className="space-y-4">
                  {recruiting.candidates
                    ?.filter((c: any) => c.status === "active")
                    .map((candidate: any) => (
                      <div key={candidate._id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              candidate.stage === "offer_accepted"
                                ? "bg-green-100 text-green-800"
                                : candidate.stage === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {candidate.stage.replace("_", " ")}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/recruiting/${id}/candidates/${candidate._id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{recruiting.notes || "No notes yet."}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecruitingDetail
