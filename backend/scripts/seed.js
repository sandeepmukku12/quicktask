import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/user.model.js";
import Task from "../src/models/task.model.js";

dotenv.config();

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing data...");
    // await User.deleteMany();
    // await Task.deleteMany();

    console.log("Creating demo user...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await User.create({
      email: "demo@quicktask.com",
      password: hashedPassword,
    });

    console.log("Creating sample tasks...");
    const tasks = [
      {
        userId: user._id,
        title: "Finish backend APIs",
        description: "Auth, tasks, filters",
        priority: "High",
        status: "Completed",
        dueDate: new Date(),
      },
      {
        userId: user._id,
        title: "Build dashboard UI",
        description: "Charts and stats",
        priority: "Medium",
        status: "In Progress",
        dueDate: new Date(Date.now() + 2 * 86400000),
      },
      {
        userId: user._id,
        title: "Analytics service integration",
        priority: "High",
        status: "Todo",
        dueDate: new Date(Date.now() + 5 * 86400000),
      },
      {
        userId: user._id,
        title: "Test filters & sorting",
        priority: "Low",
        status: "Todo",
        dueDate: new Date(Date.now() + 4 * 86400000),
      },
      {
        userId: user._id,
        title: "Prepare deployment",
        priority: "Medium",
        status: "Completed",
        dueDate: new Date(Date.now() - 86400000),
      },
    ];

    await Task.insertMany(tasks);

    console.log("Seeding completed successfully");
    console.log("Demo login:");
    console.log("Email: demo@quicktask.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
