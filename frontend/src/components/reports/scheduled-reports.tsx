"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ScheduledReports() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("")
  const [frequency, setFrequency] = useState("")
  const [recipients, setRecipients] = useState("")

  // Mock data for scheduled reports
  // In a real implementation, this data would be fetched from the API
  // The API would return a list of scheduled report configurations including
  // the report definition, schedule, recipients, and execution history
  const scheduledReports = [
    {
      id: "1",
      name: "Monthly Headcount Summary",
      type: "Headcount",
      frequency: "Monthly",
      lastRun: "2023-04-01",
      nextRun: "2023-05-01",
      recipients: "leadership@example.com",
      active: true,
    },
    {
      id: "2",
      name: "Weekly Recruiting Pipeline",
      type: "Recruiting",
      frequency: "Weekly",
      lastRun: "2023-04-21",
      nextRun: "2023-04-28",
      recipients: "recruiting@example.com, hiring@example.com",
      active: true,
    },
    {
      id: "3",
      name: "Quarterly Financial Review",
      type: "Financial",
      frequency: "Quarterly",
      lastRun: "2023-03-31",
      nextRun: "2023-06-30",
      recipients: "finance@example.com, executives@example.com",
      active: true,
    },
    {
      id: "4",
      name: "Team Growth Report",
      type: "Team",
      frequency: "Monthly",
      lastRun: "2023-04-01",
      nextRun: "2023-05-01",
      recipients: "managers@example.com",
      active: false,
    },
    {
      id: "5",
      name: "Portfolio Allocation Report",
      type: "Portfolio",
      frequency: "Monthly",
      lastRun: "2023-04-01",
      nextRun: "2023-05-01",
      recipients: "product@example.com, strategy@example.com",
      active: true,
    },
  ]

  // Handle create report
  // In a real implementation, this would make an API call to create a new scheduled report
  // The API would validate the input, create a new scheduled report configuration in the database,
  // set up the schedule in a job scheduler (like cron), and return the created report
  // The function would handle validation errors and other API responses
  const handleCreateReport = () => {
    console.log({
      name: reportName,
      type: reportType,
      frequency,
      recipients,
    })

    setIsDialogOpen(false)
    alert("Scheduled report created successfully!")

    // Reset form
    setReportName("")
    setReportType("")
    setFrequency("")
    setRecipients("")
  }

  // Handle run now
  // In a real implementation, this would make an API call to trigger an immediate execution of the report
  // The API would generate the report, send it to the recipients, and update the execution history
  // The function would handle errors and provide feedback on the execution status
  const handleRunNow = (reportId: string) => {
    // This would trigger an API call to run the report immediately
    // The API would execute the report query, generate the report in the requested format,
    // and distribute it to the recipients via email or other channels
    alert(`Running report ${reportId} now...`)
  }

  // Handle toggle active
  // In a real implementation, this would make an API call to toggle the active state of the report
  // The API would update the active flag in the database and enable/disable the schedule in the job scheduler
  // The function would handle errors and provide feedback on the state change
  const handleToggleActive = (reportId: string, currentState: boolean) => {
    // This would trigger an API call to toggle the active state of the report
    // If activating, the API would set up the schedule in the job scheduler
    // If deactivating, the API would remove the schedule from the job scheduler
    alert(`${currentState ? "Deactivating" : "Activating"} report ${reportId}...`)
  }

  // Handle delete
  // In a real implementation, this would make an API call to delete the scheduled report
  // The API would remove the report configuration from the database and the schedule from the job scheduler
  // The function would handle errors and provide feedback on the deletion
  const handleDelete = (reportId: string) => {
    // This would trigger an API call to delete the scheduled report
    // The API would remove the report configuration from the database
    // and remove any scheduled jobs from the job scheduler
    alert(`Deleting report ${reportId}...`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scheduled Reports</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Report</DialogTitle>
              <DialogDescription>
                Set up a report to be automatically generated and sent on a schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter report name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headcount">Headcount</SelectItem>
                    <SelectItem value="recruiting">Recruiting</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients (comma separated)</Label>
                <Input
                  id="recipients"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReport} disabled={!reportName || !reportType || !frequency || !recipients}>
                Schedule Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.frequency}</TableCell>
                <TableCell>{report.lastRun}</TableCell>
                <TableCell>{report.nextRun}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={report.recipients}>
                  {report.recipients}
                </TableCell>
                <TableCell>
                  <Badge variant={report.active ? "default" : "outline"}>{report.active ? "Active" : "Inactive"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRunNow(report.id)}>Run Now</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(report.id, report.active)}>
                        {report.active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(report.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
