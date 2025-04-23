"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface BaseChartProps {
  filters: any
  renderChart: (element: HTMLDivElement) => void
  height?: string
  width?: string
}

export function BaseChart({ filters, renderChart, height = "100%", width = "100%" }: BaseChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chartRef.current) {
      setLoading(true)

      // Clear previous chart
      chartRef.current.innerHTML = ""

      // Simulate data loading
      const timer = setTimeout(() => {
        if (chartRef.current) {
          renderChart(chartRef.current)
          setLoading(false)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [filters, renderChart])

  return (
    <div style={{ height, width, position: "relative" }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <div ref={chartRef} className="h-full w-full" />
    </div>
  )
}
