import React, { useState, useEffect } from "react";
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
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-[150px]" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-3 py-2 rounded-md">
        <option value="">All Status</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border px-3 py-2 rounded-md">
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-2 rounded-md">
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created At</option>
      </select>
    </div>
  );
}
