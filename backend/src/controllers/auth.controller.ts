import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    const user = await User.create({ name, email, password })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" },
    )

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" },
    )

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Get current user error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Export the functions
