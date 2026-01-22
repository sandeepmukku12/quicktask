import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function TaskFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortBy, setSortBy] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onFilter({ search: debouncedSearch, status, priority, sortBy });
  }, [debouncedSearch, status, priority, sortBy, onFilter]);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center">
      <div className="relative flex-1 w-full min-w-[200px]">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full border-none bg-gray-50 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm" 
        />
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white border-gray-200 border px-3 py-2.5 rounded-xl text-sm flex-1 outline-none">
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-white border-gray-200 border px-3 py-2.5 rounded-xl text-sm flex-1 outline-none">
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border-gray-200 border px-3 py-2.5 rounded-xl text-sm flex-1 outline-none">
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>
    </div>
  );
}