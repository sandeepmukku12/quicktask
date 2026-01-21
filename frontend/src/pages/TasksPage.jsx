import { useEffect, useState, useContext, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/Tasks/TaskCard";
import TaskForm from "../components/Tasks/TaskForm";
import TaskFilter from "../components/Tasks/TaskFilter";
import { toast } from "react-toastify";

export default function TasksPage() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Stable fetchTasks function
  const fetchTasks = useCallback(async (filters = {}) => {
    if (!user) return;
    try {
      const res = await getTasks(user._id, filters);
      setTasks(res.data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  }, [user]);

  useEffect(() => {
    fetchTasks(); // initial fetch on mount
  }, [fetchTasks]);

  const handleAddEdit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        toast.success("Task updated");
      } else {
        await createTask({ ...taskData, userId: user._id });
        toast.success("Task created");
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks(); // refresh tasks after add/edit
    } catch {
      toast.error("Failed to save task");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Memoized filter handler
  const handleFilter = useCallback((filters) => {
    fetchTasks(filters);
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">+ Add Task</button>
        </div>

        <TaskFilter onFilter={handleFilter} />

        {tasks.length ? tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
        )) : <p className="text-gray-600 text-center mt-6">No tasks found</p>}
      </div>

      {showForm && <TaskForm task={editingTask} onSubmit={handleAddEdit} onClose={() => { setShowForm(false); setEditingTask(null); }} />}
    </div>
  );
}
