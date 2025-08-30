/* --------------------------------- Imports -------------------------------- */
// Lib
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Functions
import dbConnect from "./lib/database.js";
import { app, server } from "./lib/socket.js";
// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

/* ------------------------------- App Configs ------------------------------ */
const port = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

/* --------------------------------- Routes --------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* -------------------------------- Listening ------------------------------- */
server.listen(port, () => {
	dbConnect();
	console.log(`Running on ${port}, Click on http://localhost:8001`);
});
