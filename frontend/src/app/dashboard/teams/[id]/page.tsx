import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TeamMembersTable } from "@/components/teams/team-members-table"
import { TeamSubteamsTable } from "@/components/teams/team-subteams-table"
import { TeamPortfoliosTable } from "@/components/teams/team-portfolios-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Users, FolderKanban, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Team Details | Jingle",
  description: "View and manage team details",
}

interface TeamDetailsPageProps {
  params: {
    id: string
  }
}

export default function TeamDetailsPage({ params }: TeamDetailsPageProps) {
  // In a real app, this would fetch the team data from the API
  // For now, we'll use mock data
  const team = {
    id: params.id,
    name: "Frontend Development",
    description: "Responsible for building and maintaining the user interface of our products",
    manager: {
      id: "1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    parentTeam: {
      id: "2",
      name: "Engineering",
    },
    status: "active",
    memberCount: 12,
    subteamCount: 3,
    portfolioCount: 2,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-04-10T00:00:00.000Z",
  }

  if (!team) {
    notFound()
  }

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
            <h2 className="text-3xl font-bold tracking-tight">{team.name}</h2>
          </div>
          <p className="text-muted-foreground">{team.description}</p>
        </div>
        <Link href={`/dashboard/teams/${team.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Team
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Manager</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.manager.name}</div>
            <p className="text-xs text-muted-foreground">{team.manager.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parent Team</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.parentTeam?.name || "None"}</div>
            <p className="text-xs text-muted-foreground">Reporting structure</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.memberCount}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolios</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.portfolioCount}</div>
            <p className="text-xs text-muted-foreground">Aligned portfolios</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="subteams">Sub-teams</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <TeamMembersTable teamId={team.id} />
        </TabsContent>
        <TabsContent value="subteams" className="space-y-4">
          <TeamSubteamsTable teamId={team.id} />
        </TabsContent>
        <TabsContent value="portfolios" className="space-y-4">
          <TeamPortfoliosTable teamId={team.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
