import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PortfolioHeadcountTableProps {
  headcounts: any[]
}

export function PortfolioHeadcountTable({ headcounts }: PortfolioHeadcountTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Role Type</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headcounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No headcount found
              </TableCell>
            </TableRow>
          ) : (
            headcounts.map((headcount) => (
              <TableRow key={headcount._id}>
                <TableCell>{headcount.title}</TableCell>
                <TableCell>{headcount.level}</TableCell>
                <TableCell>{headcount.roleType?.title || "N/A"}</TableCell>
                <TableCell>{headcount.manager?.name || "Unassigned"}</TableCell>
                <TableCell>{headcount.team?.name || "Unassigned"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      headcount.status === "active"
                        ? "bg-green-100 text-green-800"
                        : headcount.status === "recruiting"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {headcount.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/headcount/${headcount._id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/headcount/${headcount._id}/edit`}>
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

export default PortfolioHeadcountTable
