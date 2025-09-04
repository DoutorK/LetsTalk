import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/livechat");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB", error);
    process.exit(1);
  }
}