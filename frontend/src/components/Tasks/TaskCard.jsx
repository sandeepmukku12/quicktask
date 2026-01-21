import React from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = { Low: "bg-green-200 text-green-800", Medium: "bg-yellow-200 text-yellow-800", High: "bg-red-200 text-red-800" };
  const statusColors = { Todo: "bg-gray-200 text-gray-800", "In Progress": "bg-blue-200 text-blue-800", Completed: "bg-green-300 text-green-900" };

  return (
    <div className="border rounded-md p-4 mb-3 shadow-sm flex justify-between items-start bg-white">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-gray-600 mt-1">{task.description}</p>
        <div className="flex gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}>{task.priority}</span>
          <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]}`}>{task.status}</span>
        </div>
        <p className="text-gray-500 mt-1 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={() => onEdit(task)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">Edit</button>
        <button onClick={() => onDelete(task._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm">Delete</button>
      </div>
    </div>
  );
}
