"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addInterview, updateInterview } from "@/services/recruiting-service"
import { getAllUsers } from "@/services/user-service"
import type { Interview } from "@/types/recruiting"
import type { User } from "@/types/user"
import { useEffect } from "react"

// Form schema
const interviewFormSchema = z.object({
  interviewer: z.string({
    required_error: "Please select an interviewer.",
  }),
  date: z.string({
    required_error: "Please select a date and time.",
  }),
  feedback: z.string().optional(),
  decision: z.string().optional(),
})

type InterviewFormValues = z.infer<typeof interviewFormSchema>

interface InterviewFormProps {
  recruitingId: string
  candidateId: string
  interviewId?: string
  initialData?: Interview
  onCancel: () => void
  onSuccess: () => void
}

export function InterviewForm({
  recruitingId,
  candidateId,
  interviewId,
  initialData,
  onCancel,
  onSuccess,
}: InterviewFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [interviewers, setInterviewers] = useState<User[]>([])

  // Fetch interviewers
  useEffect(() => {
    const fetchInterviewers = async () => {
      try {
        const users = await getAllUsers()
        setInterviewers(users)
      } catch (error) {
        console.error("Error fetching interviewers:", error)
      }
    }

    fetchInterviewers()
  }, [])

  // Initialize form
  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: initialData
      ? {
          interviewer: initialData.interviewer._id,
          date: new Date(initialData.date).toISOString().slice(0, 16),
          feedback: initialData.feedback || "",
          decision: initialData.decision || "",
        }
      : {
          interviewer: "",
          date: new Date().toISOString().slice(0, 16),
          feedback: "",
          decision: "",
        },
  })

  // Form submission handler
  async function onSubmit(values: InterviewFormValues) {
    setIsLoading(true)

    try {
      // Format the data
      const formattedData = {
        ...values,
        date: new Date(values.date),
      }

      if (interviewId && initialData) {
        await updateInterview(recruitingId, candidateId, interviewId, formattedData)
        toast.success("Interview updated successfully")
      } else {
        await addInterview(recruitingId, candidateId, formattedData)
        toast.success("Interview scheduled successfully")
      }

      onSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to save interview")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interviewer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interviewer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interviewers.map((interviewer) => (
                      <SelectItem key={interviewer._id} value={interviewer._id}>
                        {interviewer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {initialData && (
          <>
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter interview feedback..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="decision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decision</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="strong_yes">Strong Yes</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="strong_no">Strong No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : interviewId ? "Update Interview" : "Schedule Interview"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
