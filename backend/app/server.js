import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
//import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json()); // To parse JSON bodies
//app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // Replace with your client's origin
    credentials: true, // This allows cookies to be sent with requests
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
