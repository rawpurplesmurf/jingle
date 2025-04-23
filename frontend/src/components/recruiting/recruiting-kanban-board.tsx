"use client"

import { useState } from "react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Calendar, Users, Clock } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { updateRecruitingStage } from "@/services/recruiting-service"
import type { Recruiting } from "@/types/recruiting"
import { formatDate } from "@/lib/utils"

interface RecruitingKanbanBoardProps {
  recruitings: Recruiting[]
  isLoading: boolean
}

const stages = [
  { id: "triage", name: "Triage" },
  { id: "sourcing", name: "Sourcing" },
  { id: "screening", name: "Screening" },
  { id: "interviewing", name: "Interviewing" },
  { id: "offer", name: "Offer" },
  { id: "closed", name: "Closed" },
]

export function RecruitingKanbanBoard({ recruitings, isLoading }: RecruitingKanbanBoardProps) {
  const [items, setItems] = useState<Recruiting[]>(recruitings)

  // Group recruitings by stage
  const recruitingsByStage = stages.reduce(
    (acc, stage) => {
      acc[stage.id] = recruitings.filter((recruiting) => recruiting.stage === stage.id)
      return acc
    },
    {} as Record<string, Recruiting[]>,
  )

  // Handle drag and drop
  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result

    // If dropped outside a droppable area
    if (!destination) return

    // If dropped in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Update the stage in the database
    try {
      await updateRecruitingStage(draggableId, destination.droppableId)

      // Update local state
      const updatedRecruitings = recruitings.map((recruiting) => {
        if (recruiting._id === draggableId) {
          return { ...recruiting, stage: destination.droppableId }
        }
        return recruiting
      })

      setItems(updatedRecruitings)
    } catch (error) {
      console.error("Error updating recruiting stage:", error)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col h-full">
            <div className="bg-muted p-3 rounded-t-md font-medium">
              {stage.name}{" "}
              <Badge variant="outline" className="ml-2">
                0
              </Badge>
            </div>
            <div className="bg-card border rounded-b-md p-2 flex-1 min-h-[400px]">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="mb-2">
                  <CardHeader className="p-3 pb-0">
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col h-full">
            <div className="bg-muted p-3 rounded-t-md font-medium">
              {stage.name}{" "}
              <Badge variant="outline" className="ml-2">
                {recruitingsByStage[stage.id]?.length || 0}
              </Badge>
            </div>
            <Droppable droppableId={stage.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-card border rounded-b-md p-2 flex-1 min-h-[400px] overflow-y-auto"
                >
                  {recruitingsByStage[stage.id]?.map((recruiting, index) => (
                    <Draggable key={recruiting._id} draggableId={recruiting._id} index={index}>
                      {(provided) => (
                        <Link href={`/dashboard/recruiting/${recruiting._id}`}>
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 cursor-pointer hover:border-primary transition-colors"
                          >
                            <CardHeader className="p-3 pb-0">
                              <CardTitle className="text-sm font-medium">{recruiting.headcount.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-2">
                              <div className="text-xs text-muted-foreground">
                                <div className="flex items-center gap-1 mb-1">
                                  <Users className="h-3 w-3" />
                                  <span>{recruiting.candidates.length} candidates</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Open: {formatDate(recruiting.openDate)}</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="p-3 pt-0">
                              <Badge
                                variant={recruiting.status === "open" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {recruiting.status.replace("_", " ")}
                              </Badge>
                              {recruiting.status === "open" && (
                                <div className="ml-auto flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDate(recruiting.targetCloseDate)}
                                </div>
                              )}
                            </CardFooter>
                          </Card>
                        </Link>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
