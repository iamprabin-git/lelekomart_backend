// src/config/database.js
import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    // Add connection options
    const conn = await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} successfully....!!`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;