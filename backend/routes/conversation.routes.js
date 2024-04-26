import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getConversations,
  createConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getConversations);
router.post("/", protectRoute, createConversation);

export default router;
