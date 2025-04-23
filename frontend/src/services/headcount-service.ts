// This is a mock service for headcount data
// In a real application, this would make API calls to the backend

import type { Headcount } from "@/types/headcount"

export const getAllHeadcounts = async (): Promise<Headcount[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve([])
    }, 500)
  })
}

export const getHeadcountById = async (id: string): Promise<Headcount> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve({
        _id: id,
        title: "Senior Software Engineer",
        level: "IC4",
        status: "active",
        team: { _id: "1", name: "Frontend Team" },
        portfolio: { _id: "1", name: "Product A" },
        manager: { _id: "1", name: "John Doe" },
        location: "Remote",
        costCenter: "Engineering",
        annualCost: 150000,
        startDate: new Date("2023-01-15"),
        businessCase: "Critical role for product development",
        approvals: [],
        createdBy: { _id: "1", name: "John Doe" },
      } as any)
    }, 500)
  })
}

export const createHeadcount = async (headcountData: any): Promise<Headcount> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve({
        _id: Math.random().toString(36).substr(2, 9),
        ...headcountData,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)
    }, 500)
  })
}

export const updateHeadcount = async (id: string, headcountData: any): Promise<Headcount> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve({
        _id: id,
        ...headcountData,
        updatedAt: new Date(),
      } as any)
    }, 500)
  })
}

export const deleteHeadcount = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve()
    }, 500)
  })
}
