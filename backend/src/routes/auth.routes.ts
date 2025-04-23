import express from "express"
import { register, login, getCurrentUser } from "../controllers/auth.controller"
import authenticate from "../middleware/authenticate"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", authenticate, getCurrentUser)

// Export the router as authRoutes
export { register, login, getCurrentUser }
export default router
