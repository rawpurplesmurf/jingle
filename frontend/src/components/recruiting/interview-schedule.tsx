"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Candidate } from "@/types/recruiting"

interface InterviewScheduleProps {
  candidates: Candidate[]
  recruitingId: string
}

interface Interview {
  id: string
  candidateId: string
  candidateName: string
  interviewerId: string
  interviewerName: string
  date: Date
  decision?: string
}

export function InterviewSchedule({ candidates, recruitingId }: InterviewScheduleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [interviews, setInterviews] = useState<Interview[]>([])

  // Extract all interviews from candidates
  useEffect(() => {
    const extractedInterviews: Interview[] = []
    candidates.forEach((candidate) => {
      if (candidate.interviews && candidate.interviews.length > 0) {
        candidate.interviews.forEach((interview) => {
          extractedInterviews.push({
            id: interview._id,
            candidateId: candidate._id,
            candidateName: candidate.name,
            interviewerId: interview.interviewer._id,
            interviewerName: interview.interviewer.name,
            date: new Date(interview.date),
            decision: interview.decision,
          })
        })
      }
    })
    setInterviews(extractedInterviews)
  }, [candidates])

  // Filter interviews for selected date
  const interviewsForSelectedDate = interviews.filter((interview) => {
    if (!date) return false
    return (
      interview.date.getDate() === date.getDate() &&
      interview.date.getMonth() === date.getMonth() &&
      interview.date.getFullYear() === date.getFullYear()
    )
  })

  // Sort interviews by time
  const sortedInterviews = [...interviewsForSelectedDate].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Get dates with interviews for calendar highlighting
  const datesWithInterviews = interviews.map((interview) => {
    const date = new Date(interview.date)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={{
                hasInterview: datesWithInterviews,
              }}
              modifiersStyles={{
                hasInterview: { fontWeight: "bold", backgroundColor: "rgba(var(--primary), 0.1)" },
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Upcoming Interviews</h3>
          <div className="space-y-2">
            {interviews
              .filter((interview) => new Date(interview.date) >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((interview) => (
                <div
                  key={interview.id}
                  className="text-xs p-2 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => setDate(new Date(interview.date))}
                >
                  <div className="font-medium">{interview.candidateName}</div>
                  <div className="flex justify-between mt-1 text-muted-foreground">
                    <span>{interview.date.toLocaleDateString()}</span>
                    <span>
                      {interview.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            {interviews.filter((interview) => new Date(interview.date) >= new Date()).length === 0 && (
              <div className="text-xs text-muted-foreground">No upcoming interviews</div>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-lg font-medium mb-4">Interviews for {date?.toLocaleDateString() || "Selected Date"}</h3>
        {sortedInterviews.length > 0 ? (
          <div className="space-y-4">
            {sortedInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{interview.candidateName}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {interview.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{interview.interviewerName}</span>
                      </div>
                      {interview.decision && (
                        <Badge
                          variant={interview.decision.includes("yes") ? "default" : "destructive"}
                          className="mt-1"
                        >
                          {interview.decision.replace("_", " ")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">No interviews scheduled for this date.</div>
        )}
      </div>
    </div>
  )
}
