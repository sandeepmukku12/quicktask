import { useState, useEffect } from "react";

export default function TaskForm({ task, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate?.split("T")[0] || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    onSubmit({ title, description, priority, status, dueDate });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <div className="flex gap-2">
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border px-3 py-2 rounded-md flex-1">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-3 py-2 rounded-md flex-1">
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">{task ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
