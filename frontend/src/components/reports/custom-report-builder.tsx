"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Save } from "lucide-react"

export function CustomReportBuilder() {
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("headcount")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [groupBy, setGroupBy] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock field options based on report type
  // In a real implementation, these options would be fetched from the API
  // based on the available fields in each entity type (headcount, recruiting, financial)
  // The API would provide metadata about each field including its name, type, and available operations
  const fieldOptions = {
    headcount: [
      { id: "team", label: "Team" },
      { id: "portfolio", label: "Portfolio" },
      { id: "manager", label: "Manager" },
      { id: "level", label: "Level" },
      { id: "location", label: "Location" },
      { id: "employeeType", label: "Employee Type" },
      { id: "status", label: "Status" },
      { id: "roleType", label: "Role Type" },
      { id: "cost", label: "Cost" },
    ],
    recruiting: [
      { id: "position", label: "Position" },
      { id: "team", label: "Team" },
      { id: "hiringManager", label: "Hiring Manager" },
      { id: "recruiter", label: "Recruiter" },
      { id: "stage", label: "Stage" },
      { id: "status", label: "Status" },
      { id: "timeToHire", label: "Time to Hire" },
      { id: "candidateCount", label: "Candidate Count" },
    ],
    financial: [
      { id: "budget", label: "Budget" },
      { id: "actual", label: "Actual" },
      { id: "variance", label: "Variance" },
      { id: "team", label: "Team" },
      { id: "portfolio", label: "Portfolio" },
      { id: "employeeType", label: "Employee Type" },
      { id: "quarter", label: "Quarter" },
      { id: "fiscalYear", label: "Fiscal Year" },
    ],
  }

  // Filter options
  // In a real implementation, these options would be dynamically generated
  // based on the selected report type and fields
  // The API would provide available filter operations for each field type
  const filterOptions = [
    { id: "dateRange", label: "Date Range" },
    { id: "team", label: "Team" },
    { id: "portfolio", label: "Portfolio" },
    { id: "employeeType", label: "Employee Type" },
    { id: "status", label: "Status" },
    { id: "location", label: "Location" },
  ]

  // Group by options
  // In a real implementation, these options would be dynamically generated
  // based on the selected report type and fields
  // Only fields that can be used for grouping would be included
  const groupByOptions = [
    { id: "team", label: "Team" },
    { id: "portfolio", label: "Portfolio" },
    { id: "manager", label: "Manager" },
    { id: "employeeType", label: "Employee Type" },
    { id: "status", label: "Status" },
    { id: "location", label: "Location" },
  ]

  // Handle field selection
  // This function toggles the selection state of a field
  // When a field is selected, it's added to the selectedFields array
  // When a field is deselected, it's removed from the selectedFields array
  const handleFieldToggle = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter((id) => id !== fieldId))
    } else {
      setSelectedFields([...selectedFields, fieldId])
    }
  }

  // Handle filter selection
  // This function toggles the selection state of a filter
  // When a filter is selected, it's added to the selectedFilters array
  // When a filter is deselected, it's removed from the selectedFilters array
  const handleFilterToggle = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId))
    } else {
      setSelectedFilters([...selectedFilters, filterId])
    }
  }

  // Handle report type change
  // When the report type changes, we reset the selected fields
  // because different report types have different available fields
  const handleReportTypeChange = (type: string) => {
    setReportType(type)
    setSelectedFields([])
  }

  // Handle save report
  // In a real implementation, this would make an API call to save the report configuration
  // The API would store the report definition in the database, including all selected fields,
  // filters, grouping, and sorting options
  // The saved report would be available for future use and could be scheduled for automatic generation
  const handleSaveReport = () => {
    console.log({
      name: reportName,
      type: reportType,
      fields: selectedFields,
      filters: selectedFilters,
      groupBy,
      sortBy,
    })

    setIsDialogOpen(false)
    alert("Report saved successfully!")
  }

  // Handle generate report
  // In a real implementation, this would make an API call to generate the report
  // The API would execute a query based on the report definition, retrieve the data,
  // format it according to the selected options, and return the report data
  // The UI would then display the report data in a table or chart
  const handleGenerateReport = () => {
    alert("Generating report...")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Report Builder</CardTitle>
        <CardDescription>Create custom reports by selecting fields, filters, and grouping options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={reportType} onValueChange={handleReportTypeChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="headcount">Headcount</TabsTrigger>
            <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Select Fields</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fieldOptions[reportType as keyof typeof fieldOptions].map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field.id}`}
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => handleFieldToggle(field.id)}
                  />
                  <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Select Filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${filter.id}`}
                    checked={selectedFilters.includes(filter.id)}
                    onCheckedChange={() => handleFilterToggle(filter.id)}
                  />
                  <Label htmlFor={`filter-${filter.id}`}>{filter.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group-by">Group By</Label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger id="group-by">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {groupByOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by">
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {selectedFields.map((fieldId) => {
                    const field = fieldOptions[reportType as keyof typeof fieldOptions].find((f) => f.id === fieldId)
                    return field ? (
                      <SelectItem key={field.id} value={field.id}>
                        {field.label}
                      </SelectItem>
                    ) : null
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Custom Report</DialogTitle>
                <DialogDescription>Give your report a name to save it for future use.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="report-name" className="mb-2 block">
                  Report Name
                </Label>
                <Input
                  id="report-name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter report name"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveReport} disabled={!reportName.trim()}>
                  Save Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleGenerateReport} disabled={selectedFields.length === 0}>
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
