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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{task ? "Edit Task" : "Create New Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Title</label>
            <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-gray-200 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none mt-1" required />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Description</label>
            <textarea placeholder="Add some details..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-gray-200 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none mt-1" rows="3" />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border-gray-200 border px-3 py-3 rounded-xl mt-1">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-gray-200 border px-3 py-3 rounded-xl mt-1">
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border-gray-200 border px-4 py-3 rounded-xl mt-1" required />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} className="px-6 py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-all">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95">
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}