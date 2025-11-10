import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/livechat";

export async function connectDB() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB connected`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB", error);
    process.exit(1);
  }
}