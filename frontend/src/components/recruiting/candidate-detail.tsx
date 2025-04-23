"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCandidateById, updateCandidate } from "@/services/recruiting-service"

export function CandidateDetail({ recruitingId, candidateId }: { recruitingId: string; candidateId: string }) {
  const router = useRouter()
  const [candidate, setCandidate] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCandidateById(recruitingId, candidateId)
        setCandidate(data)
      } catch (error) {
        console.error("Error fetching candidate details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [recruitingId, candidateId])

  const handleStageChange = async (stage: string) => {
    try {
      const updated = await updateCandidate(recruitingId, candidateId, { stage })
      setCandidate(updated)
    } catch (error) {
      console.error("Error updating stage:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!candidate) {
    return <div>Candidate not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{candidate.name}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/recruiting/${recruitingId}/candidates/${candidateId}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/recruiting/${recruitingId}/candidates/${candidateId}/interview/new`)}
          >
            Schedule Interview
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{candidate.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="font-medium">{candidate.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stage</p>
                <p className="font-medium">{candidate.stage?.replace("_", " ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stage</CardTitle>
            <CardDescription>Update candidate stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={candidate.stage === "screening" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("screening")}
              >
                Screening
              </Button>
              <Button
                variant={candidate.stage === "phone_interview" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("phone_interview")}
              >
                Phone Interview
              </Button>
              <Button
                variant={candidate.stage === "technical_interview" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("technical_interview")}
              >
                Technical Interview
              </Button>
              <Button
                variant={candidate.stage === "onsite_interview" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("onsite_interview")}
              >
                Onsite Interview
              </Button>
              <Button
                variant={candidate.stage === "offer" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("offer")}
              >
                Offer
              </Button>
              <Button
                variant={candidate.stage === "offer_accepted" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("offer_accepted")}
              >
                Offer Accepted
              </Button>
              <Button
                variant={candidate.stage === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("rejected")}
              >
                Rejected
              </Button>
              <Button
                variant={candidate.stage === "withdrawn" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStageChange("withdrawn")}
              >
                Withdrawn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {candidate.interviews?.length === 0 ? (
            <p className="text-center text-muted-foreground">No interviews scheduled yet</p>
          ) : (
            <div className="space-y-4">
              {candidate.interviews?.map((interview: any) => (
                <div
                  key={interview._id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(interview.date).toLocaleDateString()} at{" "}
                      {new Date(interview.date).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Interviewer: {interview.interviewer?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        interview.decision === "positive"
                          ? "bg-green-100 text-green-800"
                          : interview.decision === "negative"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {interview.decision || "Pending"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/dashboard/recruiting/${recruitingId}/candidates/${candidateId}/interview/${interview._id}`
                        )
                      }
                    >
                      View
                    </Button>
                  </div>


\
