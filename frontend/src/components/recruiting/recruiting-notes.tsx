"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { updateRecruitingNotes } from "@/services/recruiting-service"

interface RecruitingNotesProps {
  notes: string
  recruitingId: string
  onUpdate: (notes: string) => void
}

export function RecruitingNotes({ notes, recruitingId, onUpdate }: RecruitingNotesProps) {
  const [value, setValue] = useState(notes || "")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateRecruitingNotes(recruitingId, value)
      onUpdate(value)
      setIsEditing(false)
      toast.success("Notes updated successfully")
    } catch (error) {
      console.error("Error updating notes:", error)
      toast.error("Failed to update notes")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter recruiting notes..."
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
      {value ? (
        <div className="whitespace-pre-line">{value}</div>
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
