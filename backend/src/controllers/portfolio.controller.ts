import type { Request, Response } from "express"
import { Portfolio } from "../models/portfolio.model"
import { User } from "../models/user.model"
import { Headcount } from "../models/headcount.model"
import { Team } from "../models/team.model"

// Get all portfolios
export const getAllPortfolios = async (req: Request, res: Response) => {
  try {
    const { level, status, owner, parentPortfolio } = req.query

    // Build filter object
    const filter: any = {}

    if (level) filter.level = level
    if (status) filter.status = status
    if (owner) filter.owner = owner
    if (parentPortfolio) filter.parentPortfolio = parentPortfolio

    const portfolios = await Portfolio.find(filter)
      .populate("owner", "name email")
      .populate("parentPortfolio", "name level")
      .sort({ level: 1, name: 1 })

    res.json(portfolios)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get portfolio by ID
export const getPortfolioById = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate("owner", "name email level department")
      .populate("parentPortfolio", "name level description")

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    // Get sub-portfolios
    const subPortfolios = await Portfolio.find({ parentPortfolio: portfolio._id })
      .populate("owner", "name")
      .select("name description level owner status")

    // Get teams aligned to this portfolio
    const alignedTeams = await Team.find({ portfolios: portfolio._id })
      .populate("manager", "name")
      .select("name description manager status")

    // Get headcount assigned to this portfolio
    const headcounts = await Headcount.find({ portfolio: portfolio._id })
      .populate("roleType", "title")
      .populate("manager", "name")
      .populate("team", "name")
      .select("title level location manager team roleType status employeeType")
      .limit(100) // Limit to prevent large responses

    res.json({
      portfolio,
      subPortfolios,
      alignedTeams,
      headcounts,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create new portfolio
export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const { name, description, level, parentPortfolio, owner, status, priority } = req.body

    // Validate owner exists
    const ownerExists = await User.findById(owner)
    if (!ownerExists) {
      return res.status(400).json({ message: "Owner not found" })
    }

    // Validate parent portfolio if provided
    if (parentPortfolio) {
      const parentPortfolioExists = await Portfolio.findById(parentPortfolio)
      if (!parentPortfolioExists) {
        return res.status(400).json({ message: "Parent portfolio not found" })
      }

      // Check level hierarchy
      if (level === 1 && parentPortfolioExists) {
        return res.status(400).json({ message: "L1 portfolios cannot have a parent" })
      }

      if (level === 2 && parentPortfolioExists.level !== 1) {
        return res.status(400).json({ message: "L2 portfolios must have an L1 parent" })
      }

      if (level === 3 && parentPortfolioExists.level !== 2) {
        return res.status(400).json({ message: "L3 portfolios must have an L2 parent" })
      }
    } else {
      // If no parent, must be L1
      if (level !== 1) {
        return res.status(400).json({ message: `Level ${level} portfolios must have a parent portfolio` })
      }
    }

    const portfolio = new Portfolio({
      name,
      description,
      level,
      parentPortfolio,
      owner,
      status,
      priority,
    })

    await portfolio.save()

    res.status(201).json({
      message: "Portfolio created successfully",
      portfolio,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update portfolio
export const updatePortfolio = async (req: Request, res: Response) => {
  try {
    const { name, description, level, parentPortfolio, owner, status, priority } = req.body

    const portfolio = await Portfolio.findById(req.params.id)

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    // Validate owner exists if changing
    if (owner && owner !== portfolio.owner.toString()) {
      const ownerExists = await User.findById(owner)
      if (!ownerExists) {
        return res.status(400).json({ message: "Owner not found" })
      }
    }

    // Validate parent portfolio if changing
    if (parentPortfolio !== undefined && parentPortfolio !== portfolio.parentPortfolio?.toString()) {
      // Check for circular reference
      if (parentPortfolio === req.params.id) {
        return res.status(400).json({ message: "Portfolio cannot be its own parent" })
      }

      if (parentPortfolio) {
        const parentPortfolioExists = await Portfolio.findById(parentPortfolio)
        if (!parentPortfolioExists) {
          return res.status(400).json({ message: "Parent portfolio not found" })
        }

        // Check level hierarchy
        const newLevel = level || portfolio.level
        if (newLevel === 1) {
          return res.status(400).json({ message: "L1 portfolios cannot have a parent" })
        }

        if (newLevel === 2 && parentPortfolioExists.level !== 1) {
          return res.status(400).json({ message: "L2 portfolios must have an L1 parent" })
        }

        if (newLevel === 3 && parentPortfolioExists.level !== 2) {
          return res.status(400).json({ message: "L3 portfolios must have an L2 parent" })
        }

        // Check if this would create a circular reference in the hierarchy
        let currentParent = parentPortfolio
        const visited = new Set([req.params.id])

        while (currentParent) {
          if (visited.has(currentParent)) {
            return res.status(400).json({ message: "Circular reference detected in portfolio hierarchy" })
          }

          visited.add(currentParent)
          const parent = await Portfolio.findById(currentParent)
          currentParent = parent?.parentPortfolio?.toString() || null
        }
      } else if (level && level !== 1) {
        return res.status(400).json({ message: `Level ${level} portfolios must have a parent portfolio` })
      }
    }

    // Update fields
    if (name) portfolio.name = name
    if (description) portfolio.description = description
    if (level) portfolio.level = level
    if (parentPortfolio !== undefined) portfolio.parentPortfolio = parentPortfolio || undefined
    if (owner) portfolio.owner = owner
    if (status) portfolio.status = status
    if (priority) portfolio.priority = priority

    await portfolio.save()

    res.json({
      message: "Portfolio updated successfully",
      portfolio,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete portfolio
export const deletePortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    // Check if portfolio has sub-portfolios
    const hasSubPortfolios = await Portfolio.exists({ parentPortfolio: req.params.id })
    if (hasSubPortfolios) {
      return res.status(400).json({ message: "Cannot delete portfolio with sub-portfolios" })
    }

    // Check if portfolio has active headcount
    const hasHeadcount = await Headcount.exists({ portfolio: req.params.id })
    if (hasHeadcount) {
      return res.status(400).json({ message: "Cannot delete portfolio with assigned headcount" })
    }

    // Check if portfolio is aligned to any teams
    const isAlignedToTeams = await Team.exists({ portfolios: req.params.id })
    if (isAlignedToTeams) {
      return res.status(400).json({ message: "Cannot delete portfolio aligned to teams" })
    }

    await portfolio.remove()

    res.json({ message: "Portfolio deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get portfolio hierarchy
export const getPortfolioHierarchy = async (req: Request, res: Response) => {
  try {
    // Get all L1 portfolios
    const l1Portfolios = await Portfolio.find({ level: 1 })
      .populate("owner", "name")
      .select("name description level owner status priority")

    // Function to recursively build portfolio hierarchy
    const buildHierarchy = async (portfolios: any[]) => {
      const result = []

      for (const portfolio of portfolios) {
        const subPortfolios = await Portfolio.find({ parentPortfolio: portfolio._id })
          .populate("owner", "name")
          .select("name description level owner status priority")

        const portfolioObj = portfolio.toObject()

        if (subPortfolios.length > 0) {
          portfolioObj.subPortfolios = await buildHierarchy(subPortfolios)
        }

        // Get headcount count for this portfolio
        portfolioObj.headcountCount = await Headcount.countDocuments({ portfolio: portfolio._id })

        result.push(portfolioObj)
      }

      return result
    }

    const hierarchy = await buildHierarchy(l1Portfolios)

    res.json(hierarchy)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get portfolio distribution
export const getPortfolioDistribution = async (req: Request, res: Response) => {
  try {
    // Aggregate headcount by portfolio
    const distribution = await Headcount.aggregate([
      {
        $lookup: {
          from: "portfolios",
          localField: "portfolio",
          foreignField: "_id",
          as: "portfolioData",
        },
      },
      {
        $unwind: "$portfolioData",
      },
      {
        $group: {
          _id: "$portfolio",
          name: { $first: "$portfolioData.name" },
          level: { $first: "$portfolioData.level" },
          count: { $sum: 1 },
          activeCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
          recruitingCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "recruiting"] }, 1, 0],
            },
          },
          approvedCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
            },
          },
          preApprovalCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "pre_approval"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { count: -1 },
      },
    ])

    res.json(distribution)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Export the functions
