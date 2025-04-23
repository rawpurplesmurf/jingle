import express from "express"
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeamMembers,
  getTeamHierarchy,
} from "../controllers/team.controller"
import authenticate from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getAllTeams)
router.get("/hierarchy", authenticate, getTeamHierarchy)
router.get("/:id", authenticate, getTeamById)
router.get("/:id/members", authenticate, getTeamMembers)
router.post("/", authenticate, createTeam)
router.put("/:id", authenticate, updateTeam)
router.delete("/:id", authenticate, deleteTeam)

// Export the router as teamRoutes
export { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam, getTeamMembers, getTeamHierarchy }
export default router
