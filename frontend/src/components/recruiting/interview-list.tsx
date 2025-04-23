"use client"

import { useState } from "react"
import { Calendar, Clock, User, ThumbsUp, ThumbsDown, Edit } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { InterviewForm } from "./interview-form"
import type { Interview } from "@/types/recruiting"
import { formatDate } from "@/lib/utils"

interface InterviewListProps {
  interviews: Interview[]
  recruitingId: string
  candidateId: string
}

export function InterviewList({ interviews, recruitingId, candidateId }: InterviewListProps) {
  const [editingInterview, setEditingInterview] = useState<string | null>(null)

  // Sort interviews by date
  const sortedInterviews = [...interviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Get decision badge variant
  const getDecisionBadge = (decision?: string) => {
    if (!decision) return null

    let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
    let icon = null

    switch (decision) {
      case "strong_yes":
        variant = "default"
        icon = <ThumbsUp className="h-3 w-3 mr-1" />
        break
      case "yes":
        variant = "secondary"
        icon = <ThumbsUp className="h-3 w-3 mr-1" />
        break
      case "no":
        variant = "destructive"
        icon = <ThumbsDown className="h-3 w-3 mr-1" />
        break
      case "strong_no":
        variant = "destructive"
        icon = <ThumbsDown className="h-3 w-3 mr-1" />
        break
    }

    return (
      <Badge variant={variant} className="ml-2">
        {icon}
        {decision.replace("_", " ")}
      </Badge>
    )
  }

  if (interviews.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No interviews scheduled yet.</div>
  }

  if (editingInterview) {
    const interview = interviews.find((i) => i._id === editingInterview)
    if (!interview) return null

    return (
      <Card>
        <CardHeader>Edit Interview</CardHeader>
        <CardContent>
          <InterviewForm
            recruitingId={recruitingId}
            candidateId={candidateId}
            interviewId={editingInterview}
            initialData={interview}
            onCancel={() => setEditingInterview(null)}
            onSuccess={() => setEditingInterview(null)}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {sortedInterviews.map((interview) => (
        <Card key={interview._id}>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{interview.interviewer.name}</span>
                {interview.decision && getDecisionBadge(interview.decision)}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(interview.date)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(interview.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {interview.feedback && (
              <>
                <Separator className="my-2" />
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Feedback</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{interview.feedback}</p>
                </div>
              </>
            )}

            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setEditingInterview(interview._id)}>
                <Edit className="h-3 w-3 mr-1" /> Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
