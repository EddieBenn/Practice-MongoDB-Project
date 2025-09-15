import mongoose from "mongoose";
import { config } from './index';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.MONGO_URI!);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
