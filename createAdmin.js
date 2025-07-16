// createAdmin.js
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

connectDB();

(async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@beeyond.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("adminpassword123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@beeyond.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();
