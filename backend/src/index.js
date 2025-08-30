/* --------------------------------- Imports -------------------------------- */
// Lib
import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
// Functions
import dbConnect from "./lib/database.js";
import { app, server } from "./lib/socket.js";
// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

/* ------------------------------- App Configs ------------------------------ */
const port = process.env.PORT;

const __dirname = path.resolve();

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

/* ---------------------------------- Build --------------------------------- */
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

/* -------------------------------- Listening ------------------------------- */

server.listen(port, () => {
	dbConnect();
	console.log(`Running on ${port}, Click on http://localhost:8001`);
});
