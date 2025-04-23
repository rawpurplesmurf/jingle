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
import { createHeadcount, updateHeadcount } from "@/services/headcount-service"
import { getAllUsers } from "@/services/user-service"
import { getAllTeams } from "@/services/team-service"
import { getAllPortfolios } from "@/services/portfolio-service"
import { getAllRoles } from "@/services/role-service"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  type: z.enum(["FTE", "Contractor", "Vendor", "Agency"]),
  level: z.string().min(1, {
    message: "Level is required.",
  }),
  status: z.enum(["Draft", "Pending Approval", "Approved", "Rejected", "On Hold", "Filled", "Closed"]),
  team: z.string({
    required_error: "Please select a team.",
  }),
  portfolio: z.string({
    required_error: "Please select a portfolio.",
  }),
  manager: z.string({
    required_error: "Please select a manager.",
  }),
  location: z.string().min(1, {
    message: "Location is required.",
  }),
  costCenter: z.string().min(1, {
    message: "Cost center is required.",
  }),
  annualCost: z.coerce.number().positive({
    message: "Annual cost must be a positive number.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().optional(),
  businessCase: z.string().min(10, {
    message: "Business case must be at least 10 characters.",
  }),
})

interface HeadcountFormProps {
  headcount?: any
  isEdit?: boolean
}

export function HeadcountForm({ headcount, isEdit = false }: HeadcountFormProps) {
  const router = useRouter()
  const [users, setUsers] = React.useState<any[]>([])
  const [teams, setTeams] = React.useState<any[]>([])
  const [portfolios, setPortfolios] = React.useState<any[]>([])
  const [roles, setRoles] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: headcount?.title || "",
      type: headcount?.type || "FTE",
      level: headcount?.level || "",
      status: headcount?.status || "Draft",
      team: headcount?.team?._id || "",
      portfolio: headcount?.portfolio?._id || "",
      manager: headcount?.manager?._id || "",
      location: headcount?.location || "",
      costCenter: headcount?.costCenter || "",
      annualCost: headcount?.annualCost || 0,
      startDate: headcount?.startDate ? new Date(headcount.startDate).toISOString().split("T")[0] : "",
      endDate: headcount?.endDate ? new Date(headcount.endDate).toISOString().split("T")[0] : "",
      businessCase: headcount?.businessCase || "",
    },
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, teamsData, portfoliosData, rolesData] = await Promise.all([
          getAllUsers(),
          getAllTeams(),
          getAllPortfolios(),
          getAllRoles(),
        ])
        setUsers(usersData)
        setTeams(teamsData)
        setPortfolios(portfoliosData)
        setRoles(rolesData)
      } catch (error) {
        console.error("Error fetching form data:", error)
      }
    }

    fetchData()
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (isEdit && headcount) {
        await updateHeadcount(headcount._id, values)
      } else {
        await createHeadcount(values)
      }
      router.push("/dashboard/headcount")
    } catch (error) {
      console.error("Error saving headcount:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Headcount" : "Create Headcount"}</CardTitle>
        <CardDescription>
          {isEdit ? "Update the headcount details below." : "Enter the details for the new headcount."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormDescription>The job title for this position.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FTE">FTE</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                        <SelectItem value="Vendor">Vendor</SelectItem>
                        <SelectItem value="Agency">Agency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The type of headcount.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter level (e.g., IC3)" {...field} />
                    </FormControl>
                    <FormDescription>The level for this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team._id} value={team._id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The team this position belongs to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a portfolio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {portfolios.map((portfolio) => (
                          <SelectItem key={portfolio._id} value={portfolio._id}>
                            {portfolio.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The portfolio this position is aligned to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    <FormDescription>The manager for this position.</FormDescription>
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
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Filled">Filled</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The current status of this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormDescription>The location for this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="costCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Center</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cost center" {...field} />
                    </FormControl>
                    <FormDescription>The cost center for this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="annualCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Cost</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter annual cost" {...field} />
                    </FormControl>
                    <FormDescription>The annual cost for this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>The start date for this position.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>The end date for this position (if applicable).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="businessCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Case</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter business case" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>The business case for this position.</FormDescription>
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
              {isLoading ? "Saving..." : isEdit ? "Update Headcount" : "Create Headcount"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default HeadcountForm
