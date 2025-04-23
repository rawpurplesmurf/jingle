"use client"

import { BaseChart } from "./base-chart"

interface HeadcountTrendChartProps {
  filters: any
}

export function HeadcountTrendChart({ filters }: HeadcountTrendChartProps) {
  const renderChart = (element: HTMLDivElement) => {
    // In a real app, this would use a charting library like Chart.js, Recharts, or D3
    // For this example, we'll create a simple mock chart

    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = [120, 132, 145, 160, 178, 190, 205, 220, 235, 245, 260, 275]
    const approvedData = [10, 15, 12, 8, 14, 10, 12, 15, 10, 8, 12, 10]
    const recruitingData = [5, 8, 10, 12, 6, 8, 10, 5, 8, 10, 8, 12]

    // Create a simple canvas-based chart
    const canvas = document.createElement("canvas")
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    element.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up chart dimensions
    const padding = 40
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

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#666"
    ctx.font = "10px sans-serif"

    const xStep = chartWidth / (months.length - 1)
    months.forEach((month, i) => {
      const x = padding + i * xStep
      const y = canvas.height - padding + 15
      ctx.fillText(month, x, y)
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    const maxValue = Math.max(...data) + 50
    const yStep = chartHeight / 5

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i)
      const x = padding - 10
      const y = canvas.height - padding - i * yStep
      ctx.fillText(value.toString(), x, y + 3)
    }

    // Draw active headcount line
    ctx.beginPath()
    data.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvas.height - padding - (value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + (data.length - 1) * xStep, canvas.height - padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fill()

    // Draw approved headcount bars
    const barWidth = xStep * 0.3
    approvedData.forEach((value, i) => {
      const x = padding + i * xStep - barWidth / 2
      const height = (value / maxValue) * chartHeight
      const y = canvas.height - padding - height

      ctx.fillStyle = "rgba(34, 197, 94, 0.7)"
      ctx.fillRect(x, y, barWidth, height)
    })

    // Draw recruiting headcount bars
    recruitingData.forEach((value, i) => {
      const x = padding + i * xStep + barWidth / 2
      const height = (value / maxValue) * chartHeight
      const y = canvas.height - padding - height

      ctx.fillStyle = "rgba(249, 115, 22, 0.7)"
      ctx.fillRect(x, y, barWidth, height)
    })

    // Draw legend
    const legendX = canvas.width - padding - 150
    const legendY = padding + 20

    // Active line
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "#666"
    ctx.textAlign = "left"
    ctx.fillText("Active Headcount", legendX + 25, legendY + 4)

    // Approved bar
    ctx.fillStyle = "rgba(34, 197, 94, 0.7)"
    ctx.fillRect(legendX, legendY + 15, 20, 10)
    ctx.fillStyle = "#666"
    ctx.fillText("Approved", legendX + 25, legendY + 20)

    // Recruiting bar
    ctx.fillStyle = "rgba(249, 115, 22, 0.7)"
    ctx.fillRect(legendX, legendY + 30, 20, 10)
    ctx.fillStyle = "#666"
    ctx.fillText("Recruiting", legendX + 25, legendY + 35)
  }

  return <BaseChart filters={filters} renderChart={renderChart} />
}

// Export the component
