import type { Request, Response } from "express"
import { Team } from "../models/team.model"
import { User } from "../models/user.model"
import { Headcount } from "../models/headcount.model"

// Get all teams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const { status, manager, parentTeam } = req.query

    // Build filter object
    const filter: any = {}

    if (status) filter.status = status
    if (manager) filter.manager = manager
    if (parentTeam) filter.parentTeam = parentTeam

    const teams = await Team.find(filter)
      .populate("manager", "name email")
      .populate("parentTeam", "name")
      .populate("portfolios", "name level")
      .sort({ name: 1 })

    res.json(teams)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get team by ID
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("manager", "name email level department")
      .populate("parentTeam", "name description")
      .populate("portfolios", "name level description")

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Get team members (headcount assigned to this team)
    const teamMembers = await Headcount.find({ team: team._id, status: "active" })
      .populate("roleType", "title")
      .populate("manager", "name email")
      .select("title level location manager roleType")

    // Get sub-teams
    const subTeams = await Team.find({ parentTeam: team._id })
      .populate("manager", "name")
      .select("name description manager status")

    res.json({
      team,
      teamMembers,
      subTeams,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, manager, parentTeam, portfolios, status } = req.body

    // Validate manager exists
    const managerExists = await User.findById(manager)
    if (!managerExists) {
      return res.status(400).json({ message: "Manager not found" })
    }

    // Validate parent team if provided
    if (parentTeam) {
      const parentTeamExists = await Team.findById(parentTeam)
      if (!parentTeamExists) {
        return res.status(400).json({ message: "Parent team not found" })
      }
    }

    const team = new Team({
      name,
      description,
      manager,
      parentTeam,
      portfolios,
      status,
    })

    await team.save()

    res.status(201).json({
      message: "Team created successfully",
      team,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, manager, parentTeam, portfolios, status } = req.body

    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Validate manager exists if changing
    if (manager && manager !== team.manager.toString()) {
      const managerExists = await User.findById(manager)
      if (!managerExists) {
        return res.status(400).json({ message: "Manager not found" })
      }
    }

    // Validate parent team if changing
    if (parentTeam && parentTeam !== team.parentTeam?.toString()) {
      // Check for circular reference
      if (parentTeam === req.params.id) {
        return res.status(400).json({ message: "Team cannot be its own parent" })
      }

      const parentTeamExists = await Team.findById(parentTeam)
      if (!parentTeamExists) {
        return res.status(400).json({ message: "Parent team not found" })
      }

      // Check if this would create a circular reference in the hierarchy
      let currentParent = parentTeam
      const visited = new Set([req.params.id])

      while (currentParent) {
        if (visited.has(currentParent)) {
          return res.status(400).json({ message: "Circular reference detected in team hierarchy" })
        }

        visited.add(currentParent)
        const parent = await Team.findById(currentParent)
        currentParent = parent?.parentTeam?.toString() || null
      }
    }

    // Update fields
    if (name) team.name = name
    if (description) team.description = description
    if (manager) team.manager = manager
    if (parentTeam !== undefined) team.parentTeam = parentTeam || undefined
    if (portfolios) team.portfolios = portfolios
    if (status) team.status = status

    await team.save()

    res.json({
      message: "Team updated successfully",
      team,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Check if team has sub-teams
    const hasSubTeams = await Team.exists({ parentTeam: req.params.id })
    if (hasSubTeams) {
      return res.status(400).json({ message: "Cannot delete team with sub-teams" })
    }

    // Check if team has active headcount
    const hasHeadcount = await Headcount.exists({ team: req.params.id, status: "active" })
    if (hasHeadcount) {
      return res.status(400).json({ message: "Cannot delete team with active headcount" })
    }

    await team.remove()

    res.json({ message: "Team deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get team hierarchy
export const getTeamHierarchy = async (req: Request, res: Response) => {
  try {
    // Get all root teams (teams without a parent)
    const rootTeams = await Team.find({ parentTeam: { $exists: false } })
      .populate("manager", "name")
      .select("name description manager status")

    // Function to recursively build team hierarchy
    const buildHierarchy = async (teams: any[]) => {
      const result = []

      for (const team of teams) {
        const subTeams = await Team.find({ parentTeam: team._id })
          .populate("manager", "name")
          .select("name description manager status")

        const teamObj = team.toObject()

        if (subTeams.length > 0) {
          teamObj.subTeams = await buildHierarchy(subTeams)
        }

        result.push(teamObj)
      }

      return result
    }

    const hierarchy = await buildHierarchy(rootTeams)

    res.json(hierarchy)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get team members
export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id

    // Check if team exists
    const teamExists = await Team.exists({ _id: teamId })
    if (!teamExists) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Get all headcount assigned to this team
    const teamMembers = await Headcount.find({ team: teamId })
      .populate("roleType", "title jobFamily")
      .populate("manager", "name email")
      .populate("portfolio", "name")
      .select("title level location manager roleType status employeeType")
      .sort({ title: 1 })

    res.json(teamMembers)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Export the functions
