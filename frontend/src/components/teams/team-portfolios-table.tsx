import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TeamPortfoliosTableProps {
  portfolios: any[]
}

export function TeamPortfoliosTable({ portfolios }: TeamPortfoliosTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
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
                <TableCell className="max-w-xs truncate">{portfolio.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/portfolio/${portfolio._id}`}>
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

export default TeamPortfoliosTable
