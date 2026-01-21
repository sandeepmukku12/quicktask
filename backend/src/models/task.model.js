import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
    },
    status: {
        type: String,
        enum: ["Todo", "In Progress", "Completed"],
        default: "Todo",
    },
    dueDate: {
        type: Date,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;