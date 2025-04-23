import type { Request, Response } from "express"
import { Headcount } from "../models/headcount.model"

// Get all headcounts
export const getAllHeadcounts = async (req: Request, res: Response) => {
  try {
    const headcounts = await Headcount.find({})
      .populate("team", "name")
      .populate("portfolio", "name")
      .populate("manager", "name email")

    res.status(200).json({ headcounts })
  } catch (error) {
    console.error("Get all headcounts error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get headcount by ID
export const getHeadcountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const headcount = await Headcount.findById(id)
      .populate("team", "name")
      .populate("portfolio", "name")
      .populate("manager", "name email")
      .populate("approvals.approver", "name email")

    if (!headcount) {
      return res.status(404).json({ message: "Headcount not found" })
    }

    res.status(200).json({ headcount })
  } catch (error) {
    console.error("Get headcount by ID error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Create headcount
export const createHeadcount = async (req: Request, res: Response) => {
  try {
    const headcount = await Headcount.create(req.body)
    res.status(201).json({ headcount })
  } catch (error) {
    console.error("Create headcount error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Update headcount
export const updateHeadcount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const headcount = await Headcount.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!headcount) {
      return res.status(404).json({ message: "Headcount not found" })
    }

    res.status(200).json({ headcount })
  } catch (error) {
    console.error("Update headcount error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Add approval to headcount
export const addApproval = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { approver, status, comments } = req.body

    const headcount = await Headcount.findById(id)

    if (!headcount) {
      return res.status(404).json({ message: "Headcount not found" })
    }

    headcount.approvals.push({
      approver,
      status,
      date: new Date(),
      comments,
    })

    await headcount.save()

    res.status(200).json({ headcount })
  } catch (error) {
    console.error("Add approval error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete headcount
export const deleteHeadcount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const headcount = await Headcount.findByIdAndDelete(id)

    if (!headcount) {
      return res.status(404).json({ message: "Headcount not found" })
    }

    res.status(200).json({ message: "Headcount deleted" })
  } catch (error) {
    console.error("Delete headcount error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Export the functions
