"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createTeam, updateTeam } from "@/services/team-service"
import { getAllUsers } from "@/services/user-service"
import { getAllPortfolios } from "@/services/portfolio-service"
import { getAllTeams } from "@/services/team-service"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  manager: z.string({
    required_error: "Please select a manager.",
  }),
  parentTeam: z.string().optional(),
  portfolios: z.array(z.string()).optional(),
  status: z.enum(["active", "inactive"]),
})

interface TeamFormProps {
  team?: any
  isEdit?: boolean
}

export function TeamForm({ team, isEdit = false }: TeamFormProps) {
  const router = useRouter()
  const [users, setUsers] = React.useState<any[]>([])
  const [teams, setTeams] = React.useState<any[]>([])
  const [portfolios, setPortfolios] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team?.name || "",
      description: team?.description || "",
      manager: team?.manager?._id || "",
      parentTeam: team?.parentTeam?._id || "",
      portfolios: team?.portfolios?.map((p: any) => p._id) || [],
      status: team?.status || "active",
    },
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, teamsData, portfoliosData] = await Promise.all([
          getAllUsers(),
          getAllTeams(),
          getAllPortfolios(),
        ])
        setUsers(usersData)
        setTeams(teamsData.filter((t: any) => t._id !== team?._id))
        setPortfolios(portfoliosData)
      } catch (error) {
        console.error("Error fetching form data:", error)
      }
    }

    fetchData()
  }, [team?._id])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (isEdit && team) {
        await updateTeam(team._id, values)
      } else {
        await createTeam(values)
      }
      router.push("/dashboard/teams")
    } catch (error) {
      console.error("Error saving team:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Team" : "Create Team"}</CardTitle>
        <CardDescription>
          {isEdit ? "Update the team details below." : "Enter the details for the new team."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team name" {...field} />
                  </FormControl>
                  <FormDescription>The name of the team.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter team description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>A brief description of the team's purpose and responsibilities.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a manager" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The manager responsible for this team.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentTeam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Team</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent team (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team._id} value={team._id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The parent team, if this is a sub-team.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The current status of the team.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEdit ? "Update Team" : "Create Team"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default TeamForm
