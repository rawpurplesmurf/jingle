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
import { addCandidate, updateCandidate } from "@/services/recruiting-service"
import type { Candidate } from "@/types/recruiting"

// Form schema
const candidateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  stage: z.string({
    required_error: "Please select a stage.",
  }),
})

type CandidateFormValues = z.infer<typeof candidateFormSchema>

interface CandidateFormProps {
  recruitingId: string
  candidateId?: string
  initialData?: Candidate
  onCancel: () => void
  onSuccess: () => void
}

export function CandidateForm({ recruitingId, candidateId, initialData, onCancel, onSuccess }: CandidateFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize form
  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          status: initialData.status,
          stage: initialData.stage,
        }
      : {
          name: "",
          email: "",
          status: "active",
          stage: "applied",
        },
  })

  // Form submission handler
  async function onSubmit(values: CandidateFormValues) {
    setIsLoading(true)

    try {
      if (candidateId && initialData) {
        await updateCandidate(recruitingId, candidateId, values)
        toast.success("Candidate updated successfully")
      } else {
        await addCandidate(recruitingId, values)
        toast.success("Candidate added successfully")
      }

      onSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to save candidate")
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="phone_interview">Phone Interview</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : candidateId ? "Update Candidate" : "Add Candidate"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
