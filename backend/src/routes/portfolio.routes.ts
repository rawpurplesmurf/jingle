import express from "express"
import {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioHierarchy,
  getPortfolioDistribution,
} from "../controllers/portfolio.controller"
import authenticate from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getAllPortfolios)
router.get("/hierarchy", authenticate, getPortfolioHierarchy)
router.get("/distribution", authenticate, getPortfolioDistribution)
router.get("/:id", authenticate, getPortfolioById)
router.post("/", authenticate, createPortfolio)
router.put("/:id", authenticate, updatePortfolio)
router.delete("/:id", authenticate, deletePortfolio)

// Export the router as portfolioRoutes
export {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioHierarchy,
  getPortfolioDistribution,
}
export default router
