// src/config/database.js
import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUrl);

    console.log(`✅ MongoDB Connected: ${conn.connection.host} successfully....!!`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
