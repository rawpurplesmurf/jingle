"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getCandidateById, updateCandidate } from "@/services/recruiting-service"

interface CandidateNotesProps {
  candidateId: string
  recruitingId: string
}

export function CandidateNotes({ candidateId, recruitingId }: CandidateNotesProps) {
  const [notes, setNotes] = useState("")
  const [value, setValue] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidate = await getCandidateById(recruitingId, candidateId)
        setNotes(candidate.notes || "")
        setValue(candidate.notes || "")
      } catch (error) {
        console.error("Error fetching candidate:", error)
        toast.error("Failed to load candidate notes")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCandidate()
  }, [recruitingId, candidateId])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateCandidate(recruitingId, candidateId, { notes: value })
      setNotes(value)
      setIsEditing(false)
      toast.success("Notes updated successfully")
    } catch (error) {
      console.error("Error updating notes:", error)
      toast.error("Failed to update notes")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter candidate notes..."
          className="min-h-[200px]"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Notes"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notes ? (
        <div className="whitespace-pre-line">{notes}</div>
      ) : (
        <div className="text-muted-foreground italic">No notes added yet.</div>
      )}
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit Notes
        </Button>
      </div>
    </div>
  )
}
