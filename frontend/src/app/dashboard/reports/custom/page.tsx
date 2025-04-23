import type { Metadata } from "next"
import { CustomReportBuilder } from "@/components/reports/custom-report-builder"

export const metadata: Metadata = {
  title: "Custom Reports | Jingle",
  description: "Create custom reports for headcount management",
}

export default function CustomReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Custom Reports</h2>
      </div>

      <CustomReportBuilder />
    </div>
  )
}
