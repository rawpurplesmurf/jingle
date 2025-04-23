"use client"

import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamNode {
  _id: string
  name: string
  manager?: {
    _id: string
    name: string
  }
  subTeams?: TeamNode[]
}

interface TeamHierarchyViewProps {
  teams: TeamNode[]
  onSelect?: (team: TeamNode) => void
}

export function TeamHierarchyView({ teams, onSelect }: TeamHierarchyViewProps) {
  return (
    <div className="rounded-md border p-4">
      <h3 className="mb-4 text-lg font-medium">Team Hierarchy</h3>
      <div className="space-y-1">
        {teams.map((team) => (
          <TeamTreeNode key={team._id} team={team} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

interface TeamTreeNodeProps {
  team: TeamNode
  level?: number
  onSelect?: (team: TeamNode) => void
}

function TeamTreeNode({ team, level = 0, onSelect }: TeamTreeNodeProps) {
  const [expanded, setExpanded] = React.useState(level < 1)
  const hasChildren = team.subTeams && team.subTeams.length > 0

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(team)
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
        <span className="flex-1">{team.name}</span>
        {team.manager && <span className="ml-2 text-xs text-muted-foreground">{team.manager.name}</span>}
      </div>
      {expanded && hasChildren && (
        <div>
          {team.subTeams!.map((child) => (
            <TeamTreeNode key={child._id} team={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamHierarchyView
