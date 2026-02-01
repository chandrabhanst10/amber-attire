import mongoose from "mongoose";
import { env } from "../config/env";

const connectDB = async (): Promise<void> => {
  const mongoUri = env.MONGOD_URI;

  // Validation already handled in config/env.ts


  try {
    await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected successfully : ${mongoUri}`);
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
