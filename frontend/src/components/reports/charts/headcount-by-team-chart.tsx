"use client"

import { BaseChart } from "./base-chart"

interface HeadcountByTeamChartProps {
  filters: any
}

export function HeadcountByTeamChart({ filters }: HeadcountByTeamChartProps) {
  const renderChart = (element: HTMLDivElement) => {
    // Mock data
    const teams = [
      { name: "Frontend", count: 45 },
      { name: "Backend", count: 38 },
      { name: "Design", count: 22 },
      { name: "QA", count: 18 },
      { name: "DevOps", count: 15 },
      { name: "Product", count: 12 },
    ]

    // Sort by count descending
    teams.sort((a, b) => b.count - a.count)

    // Create a simple canvas-based chart
    const canvas = document.createElement("canvas")
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    element.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up chart dimensions
    const padding = 60
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Calculate bar width and spacing
    const barWidth = (chartWidth / teams.length) * 0.7
    const barSpacing = (chartWidth / teams.length) * 0.3

    // Find max value for scaling
    const maxValue = Math.max(...teams.map((t) => t.count))

    // Draw bars
    teams.forEach((team, i) => {
      const x = padding + i * (barWidth + barSpacing)
      const height = (team.count / maxValue) * chartHeight
      const y = canvas.height - padding - height

      // Generate a color based on index
      const hue = (i * 40) % 360
      ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`

      // Draw bar
      ctx.fillRect(x, y, barWidth, height)

      // Draw value on top of bar
      ctx.fillStyle = "#333"
      ctx.textAlign = "center"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(team.count.toString(), x + barWidth / 2, y - 5)

      // Draw team name below x-axis
      ctx.fillStyle = "#666"
      ctx.font = "10px sans-serif"
      ctx.fillText(team.name, x + barWidth / 2, canvas.height - padding + 15)
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    const yStep = chartHeight / 5

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i)
      const x = padding - 10
      const y = canvas.height - padding - i * yStep
      ctx.fillText(value.toString(), x, y + 3)
    }

    // Draw title
    ctx.textAlign = "center"
    ctx.fillStyle = "#333"
    ctx.font = "bold 14px sans-serif"
    ctx.fillText("Headcount by Team", canvas.width / 2, padding - 15)
  }

  return <BaseChart filters={filters} renderChart={renderChart} />
}
