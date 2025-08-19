import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import multer from "multer";
import orderRoutes from "./routes/orderRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import viewRoutes from "./routes/viewRoute.js";
import config from "./config/index.js";

dotenv.config();

const app = express();

connectDB();
connectCloudinary();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(logger);

// ✅ Dynamic CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "hbs");

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    name: "lelekomart_backend",
    status: "OK",
    version: "1.1.0",
    url: "https://lelekomart-backend.vercel.app",
    port: port,
  });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/page", viewRoutes);

app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}...`);
});

export default app;