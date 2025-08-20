import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import logger from "./middlewares/logger.js";

import authRoutes from "./routes/authRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import viewRoutes from "./routes/viewRoute.js";

// Load .env
dotenv.config();

const app = express();

// ✅ Connect DB + Cloudinary
connectDB();
connectCloudinary();

// ✅ Multer (for file uploads)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Logger middleware
app.use(logger);

// ✅ Dynamic CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      // ✅ Match allowed origins (handles both localhost & deployed frontend)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ✅ Extra handling: allow both localhost & 127.0.0.1 automatically
      if (
        origin.startsWith("http://localhost:3000") ||
        origin.startsWith("http://127.0.0.1:3000")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

// ✅ Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ View engine
app.set("view engine", "hbs");

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({
    name: process.env.APP_NAME || "lelekomart_backend",
    status: "OK",
    version: process.env.APP_VERSION || "1.0.0",
    url: process.env.APP_URL || "http://localhost:5000",
    port: process.env.PORT || 5000,
  });
});

// ✅ Routes with multer (where needed)
app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/page", viewRoutes);

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}...`);
});

export default app;
