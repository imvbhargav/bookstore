import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import orderRoutes from "./routes/order.js";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();

// Connect the database.
connectDB();

// Middleware
app.use((req, res, next) => {

  // Skip JSON parsing for this route as it is multipart/form-data.
  if (req.path === "/api/book/add") {
    return next();
  }
  express.json({ limit: "50mb" })(req, res, next);
});
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.LIVE_URL??"http://localhost:5173", // Adjust to frontend URL
    credentials: true, // Allow sending cookies
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));