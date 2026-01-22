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

  const userId = user?.user?.id || user?._id;

  const fetchTasks = useCallback(
    async (filters = {}) => {
      if (!userId) return;
      try {
        const res = await getTasks(userId, filters);
        setTasks(res.data);
      } catch {
        toast.error("Failed to fetch tasks");
      }
    },
    [userId],
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddEdit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        toast.success("Task updated");
      } else {
        await createTask({ ...taskData, userId });
        toast.success("Task created");
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
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

  const handleFilter = useCallback(
    (filters) => {
      fetchTasks(filters);
    },
    [fetchTasks],
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-500">
              Manage and track your daily progress
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-all active:scale-95"
          >
            + Add Task
          </button>
        </header>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
          <TaskFilter onFilter={handleFilter} />
        </div>

        {/* Task List Grid */}
        <div className="space-y-4">
          {tasks.length ? (
            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-indigo-300 transition-colors"
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
              <p className="text-gray-500">
                No tasks found. Time to add something new!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal - TaskForm */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleAddEdit}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
