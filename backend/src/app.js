import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL_DEV || "http://localhost:3000", // dev
  process.env.FRONTEND_URL_PROD, // production
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: origin ${origin} not allowed`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());

// API Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "QuickTask API running",
  });
});

// Routes
app.use("/api", routes);

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
