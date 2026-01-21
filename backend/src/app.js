import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;

// Middleware
app.use(cors());
app.use(express.json());

// API Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "QuickTask API running",
  });
});

// MongoDB connection & server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
