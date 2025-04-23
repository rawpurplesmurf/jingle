import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TeamMembersTableProps {
  members: any[]
}

export function TeamMembersTable({ members }: TeamMembersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Role Type</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No team members found
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.title}</TableCell>
                <TableCell>{member.level}</TableCell>
                <TableCell>{member.roleType?.title || "N/A"}</TableCell>
                <TableCell>{member.manager?.name || "Unassigned"}</TableCell>
                <TableCell>{member.location}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/headcount/${member._id}`}>
                      <Button variant="outline" size="sm">
                        View
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

export default TeamMembersTable
