import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, createMessage);
router.get("/:id", protectRoute, getMessages);

export default router;
