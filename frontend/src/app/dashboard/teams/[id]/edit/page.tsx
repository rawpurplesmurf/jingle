import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TeamForm } from "@/components/teams/team-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Edit Team | Jingle",
  description: "Edit team details",
}

interface EditTeamPageProps {
  params: {
    id: string
  }
}

export default function EditTeamPage({ params }: EditTeamPageProps) {
  // In a real app, this would fetch the team data from the API
  // For now, we'll use mock data
  const team = {
    id: params.id,
    name: "Frontend Development",
    description: "Responsible for building and maintaining the user interface of our products",
    managerId: "1",
    parentTeamId: "2",
    status: "active",
    portfolioIds: ["1", "3"],
  }

  if (!team) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/teams/${params.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Edit Team</h2>
          </div>
          <p className="text-muted-foreground">Edit team details for {team.name}</p>
        </div>
      </div>

      <TeamForm team={team} />
    </div>
  )
}
