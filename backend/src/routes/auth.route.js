import { Router } from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.put("/update-profile", protectedRoute, updateProfile);
authRoutes.get("/check", protectedRoute, checkAuth);

export default authRoutes;
