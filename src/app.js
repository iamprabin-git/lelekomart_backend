import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import authRoutes from "./routes/authRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import viewRoutes from "./routes/viewRoute.js";

import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();

// ================== DB & Cloudinary ==================
connectDB();
connectCloudinary();

// ================== Multer Setup ==================
const upload = multer({
  storage: multer.memoryStorage(),
});

// ================== Middleware ==================
app.use(logger);

// ✅ Allow multiple origins for CORS
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://lelekomart.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ View engine
app.set("view engine", "hbs");

// ================== Routes ==================
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    name: "lelekomart-backend",
    status: "OK",
    version: "1.1.0",
    url: "https://lelekomart-backend.vercel.app",
    port: port,
  });
});

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/users", upload.single("image"), userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/page", viewRoutes);

// ================== Start Server ==================
app.listen(port, () => {
  console.log(`✅ Server started at port ${port}...`);
});

export default app;