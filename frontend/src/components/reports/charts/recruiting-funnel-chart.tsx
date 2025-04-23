"use client"

import { BaseChart } from "./base-chart"

interface RecruitingFunnelChartProps {
  filters: any
}

export function RecruitingFunnelChart({ filters }: RecruitingFunnelChartProps) {
  const renderChart = (element: HTMLDivElement) => {
    // Mock data
    const stages = [
      { name: "Applied", count: 500, color: "#60a5fa" },
      { name: "Screened", count: 300, color: "#34d399" },
      { name: "Phone Interview", count: 180, color: "#a78bfa" },
      { name: "Technical", count: 100, color: "#fbbf24" },
      { name: "Onsite", count: 50, color: "#f87171" },
      { name: "Offer", count: 30, color: "#ec4899" },
      { name: "Hired", count: 20, color: "#8b5cf6" },
    ]

    // Create a simple canvas-based chart
    const canvas = document.createElement("canvas")
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    element.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find max value for scaling
    const maxValue = stages[0].count

    // Draw funnel
    const trapezoidHeight = chartHeight / stages.length

    stages.forEach((stage, i) => {
      const widthRatio = stage.count / maxValue
      const topWidth = i === 0 ? chartWidth : chartWidth * (stages[i - 1].count / maxValue)
      const bottomWidth = chartWidth * widthRatio

      const y = padding + i * trapezoidHeight
      const topLeftX = padding + (chartWidth - topWidth) / 2
      const bottomLeftX = padding + (chartWidth - bottomWidth) / 2

      // Draw trapezoid
      ctx.beginPath()
      ctx.moveTo(topLeftX, y)
      ctx.lineTo(topLeftX + topWidth, y)
      ctx.lineTo(bottomLeftX + bottomWidth, y + trapezoidHeight)
      ctx.lineTo(bottomLeftX, y + trapezoidHeight)
      ctx.closePath()

      ctx.fillStyle = stage.color
      ctx.fill()

      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw stage name and count
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(`${stage.name}: ${stage.count}`, padding + chartWidth / 2, y + trapezoidHeight / 2 + 4)

      // Draw conversion rate (except for first stage)
      if (i > 0) {
        const conversionRate = Math.round((stage.count / stages[i - 1].count) * 100)
        ctx.fillStyle = "#333"
        ctx.font = "10px sans-serif"
        ctx.fillText(`${conversionRate}%`, padding + chartWidth + 15, y + 5)
      }
    })

    // Draw title
    ctx.textAlign = "center"
    ctx.fillStyle = "#333"
    ctx.font = "bold 14px sans-serif"
    ctx.fillText("Recruiting Funnel", canvas.width / 2, padding - 15)
  }

  return <BaseChart filters={filters} renderChart={renderChart} />
}
