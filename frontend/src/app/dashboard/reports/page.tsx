import type { Metadata } from "next"
import { ReportsDashboard } from "@/components/reports/reports-dashboard"

export const metadata: Metadata = {
  title: "Reports & Analytics | Jingle",
  description: "Advanced reporting and analytics for headcount management",
}

export default function ReportsPage() {
  return <ReportsDashboard />
}
