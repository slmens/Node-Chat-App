import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getConversations,
  createConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getConversations);
router.post("/", protectRoute, createConversation);
router.delete("/:senderId/:receiverId", protectRoute, deleteConversation);

export default router;
