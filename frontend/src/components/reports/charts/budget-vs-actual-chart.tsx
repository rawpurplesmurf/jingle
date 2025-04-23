"use client"

import { BaseChart } from "./base-chart"

interface BudgetVsActualChartProps {
  filters: any
}

export function BudgetVsActualChart({ filters }: BudgetVsActualChartProps) {
  const renderChart = (element: HTMLDivElement) => {
    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const budgetData = [
      1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1600000, 1650000, 1700000, 1750000,
    ]
    const actualData = [
      1180000, 1220000, 1310000, 1330000, 1420000, 1460000, 1540000, 1580000, 1630000, 1680000, 1720000, 1790000,
    ]

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
    const maxValue = Math.max(...budgetData, ...actualData)
    const yStep = chartHeight / 5

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i)
      const x = padding - 10
      const y = canvas.height - padding - i * yStep
      ctx.fillText(formatCurrency(value), x, y + 3)
    }

    // Draw budget line
    ctx.beginPath()
    budgetData.forEach((value, i) => {
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

    // Draw actual line
    ctx.beginPath()
    actualData.forEach((value, i) => {
      const x = padding + i * xStep
      const y = canvas.height - padding - (value / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw variance area
    ctx.beginPath()
    for (let i = 0; i < months.length; i++) {
      const x = padding + i * xStep
      const budgetY = canvas.height - padding - (budgetData[i] / maxValue) * chartHeight
      const actualY = canvas.height - padding - (actualData[i] / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, budgetY)
      } else {
        ctx.lineTo(x, budgetY)
      }
    }

    for (let i = months.length - 1; i >= 0; i--) {
      const x = padding + i * xStep
      const actualY = canvas.height - padding - (actualData[i] / maxValue) * chartHeight
      ctx.lineTo(x, actualY)
    }

    ctx.closePath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fill()

    // Draw legend
    const legendX = canvas.width - padding - 100
    const legendY = padding + 20

    // Budget line
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "#666"
    ctx.textAlign = "left"
    ctx.fillText("Budget", legendX + 25, legendY + 4)

    // Actual line
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 15)
    ctx.lineTo(legendX + 20, legendY + 15)
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "#666"
    ctx.fillText("Actual", legendX + 25, legendY + 19)

    // Draw title
    ctx.textAlign = "center"
    ctx.fillStyle = "#333"
    ctx.font = "bold 14px sans-serif"
    ctx.fillText("Budget vs. Actual Headcount Cost", canvas.width / 2, padding - 15)
  }

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    } else {
      return `$${value}`
    }
  }

  return <BaseChart filters={filters} renderChart={renderChart} />
}

// Export the component
