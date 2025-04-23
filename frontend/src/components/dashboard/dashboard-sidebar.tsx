"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Briefcase, Building, Home, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  icon: React.ElementType
  label: string
}

function SidebarItem({ href, icon: Icon, label }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  )
}

export function DashboardSidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <SidebarItem href="/dashboard" icon={Home} label="Home" />
          <SidebarItem href="/dashboard/teams" icon={Users} label="Teams" />
          <SidebarItem href="/dashboard/portfolio" icon={Briefcase} label="Portfolio" />
          <SidebarItem href="/dashboard/headcount" icon={Building} label="Headcount" />
          <SidebarItem href="/dashboard/recruiting" icon={Users} label="Recruiting" />
          <SidebarItem href="/dashboard/reports" icon={BarChart3} label="Reports" />
        </nav>
      </div>
    </div>
  )
}

export default DashboardSidebar
