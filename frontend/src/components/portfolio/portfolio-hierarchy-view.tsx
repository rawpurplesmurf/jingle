"use client"

import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioNode {
  _id: string
  name: string
  level: number
  owner?: {
    _id: string
    name: string
  }
  subPortfolios?: PortfolioNode[]
  headcountCount?: number
}

interface PortfolioHierarchyViewProps {
  portfolios: PortfolioNode[]
  onSelect?: (portfolio: PortfolioNode) => void
}

export function PortfolioHierarchyView({ portfolios, onSelect }: PortfolioHierarchyViewProps) {
  return (
    <div className="rounded-md border p-4">
      <h3 className="mb-4 text-lg font-medium">Portfolio Hierarchy</h3>
      <div className="space-y-1">
        {portfolios.map((portfolio) => (
          <PortfolioTreeNode key={portfolio._id} portfolio={portfolio} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

interface PortfolioTreeNodeProps {
  portfolio: PortfolioNode
  level?: number
  onSelect?: (portfolio: PortfolioNode) => void
}

function PortfolioTreeNode({ portfolio, level = 0, onSelect }: PortfolioTreeNodeProps) {
  const [expanded, setExpanded] = React.useState(level < 1)
  const hasChildren = portfolio.subPortfolios && portfolio.subPortfolios.length > 0

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(portfolio)
    }
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-muted",
          level === 0 && "font-medium",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="mr-1 flex h-5 w-5 items-center justify-center rounded-sm hover:bg-muted-foreground/10"
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="mr-1 h-5 w-5" />
        )}
        <span className="flex-1">{portfolio.name}</span>
        {portfolio.headcountCount !== undefined && (
          <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{portfolio.headcountCount}</span>
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {portfolio.subPortfolios!.map((child) => (
            <PortfolioTreeNode key={child._id} portfolio={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PortfolioHierarchyView
