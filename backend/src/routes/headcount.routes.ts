import express from "express"
import {
  getAllHeadcounts,
  getHeadcountById,
  createHeadcount,
  updateHeadcount,
  deleteHeadcount,
  addApproval,
} from "../controllers/headcount.controller"
import authenticate from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getAllHeadcounts)
router.get("/:id", authenticate, getHeadcountById)
router.post("/", authenticate, createHeadcount)
router.put("/:id", authenticate, updateHeadcount)
router.delete("/:id", authenticate, deleteHeadcount)
router.post("/:id/approval", authenticate, addApproval)

// Export the router as headcountRoutes
export { getAllHeadcounts, getHeadcountById, createHeadcount, updateHeadcount, deleteHeadcount, addApproval }
export default router
