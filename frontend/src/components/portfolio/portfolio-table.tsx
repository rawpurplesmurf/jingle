import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import type { Portfolio } from "@/types/portfolio"

interface PortfolioTableProps {
  portfolios: Portfolio[]
}

export function PortfolioTable({ portfolios }: PortfolioTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No portfolios found
              </TableCell>
            </TableRow>
          ) : (
            portfolios.map((portfolio) => (
              <TableRow key={portfolio._id}>
                <TableCell>
                  <Link href={`/dashboard/portfolio/${portfolio._id}`} className="font-medium hover:underline">
                    {portfolio.name}
                  </Link>
                </TableCell>
                <TableCell>L{portfolio.level}</TableCell>
                <TableCell>{portfolio.owner?.name || "Unassigned"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      portfolio.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {portfolio.status}
                  </span>
                </TableCell>
                <TableCell>{formatDate(portfolio.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/portfolio/${portfolio._id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/portfolio/${portfolio._id}/edit`}>
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

export default PortfolioTable
