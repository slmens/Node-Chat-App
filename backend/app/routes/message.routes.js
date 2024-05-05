import express from "express";
import {
  createMessage,
  deleteUnreadMessages,
  getMessages,
  getUnreadMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, createMessage);
router.delete("/unread/:conversationId", protectRoute, deleteUnreadMessages);
router.get("/read/:conversationId", protectRoute, getUnreadMessages);
router.get("/:id", protectRoute, getMessages);

export default router;
