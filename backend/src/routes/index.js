import express from "express";
import authRoutes from "./auth.route.js";
import taskRoutes from "./task.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;