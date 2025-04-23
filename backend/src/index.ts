import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./config/database"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import headcountRoutes from "./routes/headcount.routes"
import portfolioRoutes from "./routes/portfolio.routes"
import teamRoutes from "./routes/team.routes"
import recruitingRoutes from "./routes/recruiting.routes"
import roleRoutes from "./routes/role.routes"
import { errorHandler } from "./middleware/errorHandler"
import { authenticate } from "./middleware/authenticate"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Middleware
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", authenticate, userRoutes)
app.use("/api/headcount", authenticate, headcountRoutes)
app.use("/api/portfolio", authenticate, portfolioRoutes)
app.use("/api/teams", authenticate, teamRoutes)
app.use("/api/recruiting", authenticate, recruitingRoutes)
app.use("/api/roles", authenticate, roleRoutes)

// Error handling middleware
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Jingle API server running on port ${PORT}`)
})

export default app
