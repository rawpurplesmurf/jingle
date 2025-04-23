import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import type { Team } from "@/types/team"

interface TeamTableProps {
  teams: Team[]
}

export function TeamTable({ teams }: TeamTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No teams found
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow key={team._id}>
                <TableCell>
                  <Link href={`/dashboard/teams/${team._id}`} className="font-medium hover:underline">
                    {team.name}
                  </Link>
                </TableCell>
                <TableCell>{team.manager?.name || "Unassigned"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      team.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {team.status}
                  </span>
                </TableCell>
                <TableCell>{formatDate(team.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/teams/${team._id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/teams/${team._id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TeamTable
