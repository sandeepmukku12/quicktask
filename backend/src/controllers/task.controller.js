import Task from "../models/task.model.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const task = await Task.create({
            userId: req.user,
            title,
            description,
            priority,
            status,
            dueDate,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to create task" });
    }
};

// GET ALL TASKS WITH FILTERS
export const getTasks = async (req, res) => {
    try {
        const { status, priority, search, sortBy } = req.query;
        
        let filter = { userId: req.user };

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        let tasksQuery = Task.find(filter);

        // Sorting
        if (sortBy === "dueDate") {
            tasksQuery = tasksQuery.sort({ dueDate: 1 });
        }

        else if (sortBy === "priority") {
            tasksQuery = tasksQuery.sort({ priority: 1 });
        }

        else {
            tasksQuery = tasksQuery.sort({ createdAt: -1 });
        }

        const tasks = await tasksQuery;
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to get tasks" })
    }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, userId: req.user });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // update fields dynamically
        Object.assign(task, req.body);

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to update Task" });
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};