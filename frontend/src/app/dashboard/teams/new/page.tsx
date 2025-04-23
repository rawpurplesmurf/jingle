import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TeamForm } from "@/components/teams/team-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Team | Jingle",
  description: "Create a new team",
}

export default function CreateTeamPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/teams">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Create Team</h2>
          </div>
          <p className="text-muted-foreground">Create a new team in your organization</p>
        </div>
      </div>

      <TeamForm />
    </div>
  )
}
