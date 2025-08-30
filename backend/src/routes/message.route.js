import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages, sendMessages } from "../controllers/message.controller.js";

const messageRoutes = Router();

messageRoutes.get("/users", protectedRoute, getAllUsers);
messageRoutes.get("/:id", protectedRoute, getMessages);
messageRoutes.post("/send/:id", protectedRoute, sendMessages);

export default messageRoutes;
