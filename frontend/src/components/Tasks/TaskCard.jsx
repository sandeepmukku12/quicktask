export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = { 
    Low: "bg-emerald-100 text-emerald-700", 
    Medium: "bg-amber-100 text-amber-700", 
    High: "bg-rose-100 text-rose-700" 
  };
  const statusColors = { 
    Todo: "bg-slate-100 text-slate-600", 
    "In Progress": "bg-indigo-100 text-indigo-700", 
    Completed: "bg-green-100 text-green-700" 
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row justify-between items-start gap-4 bg-white">
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 text-lg truncate">{task.title}</h3>
        <p className="text-gray-500 mt-1 text-sm line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className="text-gray-400 text-xs mt-0.5 ml-1">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
        <button 
          onClick={() => onEdit(task)} 
          className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all text-xs font-bold"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="flex-1 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all text-xs font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}