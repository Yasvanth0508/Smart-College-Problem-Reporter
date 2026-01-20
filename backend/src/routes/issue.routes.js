import express from "express";
import {createIssue,
  getAllIssues,
  updateIssueStatus,
  getMyIssues
} from "../controllers/issue.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";


const router = express.Router();

router.post("/", authenticate, createIssue);
router.get("/my-issues", authenticate, getMyIssues);
router.get("/", authenticate, authorizeRole("admin"), getAllIssues);
router.patch(
  "/:id/status",
  authenticate,
  authorizeRole("admin"),
  updateIssueStatus
);

export default router;
