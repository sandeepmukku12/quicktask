import axiosInstance from "./axiosInstance";

const TASKS_BASE_URL =
  process.env.REACT_APP_TASKS_BASE_URL || "http://localhost:8082/api";

export const getTasks = (userId, filters = {}) => {
  const params = { user_id: userId };

  if (filters.status) params.status = filters.status;
  if (filters.priority) params.priority = filters.priority;
  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sortBy = filters.sortBy;

  return axiosInstance.get(`${TASKS_BASE_URL}/tasks`, { params });
};

export const createTask = (task) => axiosInstance.post(`${TASKS_BASE_URL}/tasks`, task);
export const updateTask = (taskId, updates) => axiosInstance.put(`${TASKS_BASE_URL}/tasks/${taskId}`, updates);
export const deleteTask = (taskId) => axiosInstance.delete(`${TASKS_BASE_URL}/tasks/${taskId}`);

