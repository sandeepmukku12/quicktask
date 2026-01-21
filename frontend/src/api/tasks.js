import axiosInstance from "./axiosInstance";

const TASKS_BASE_URL = process.env.REACT_APP_TASKS_BASE_URL || "http://localhost:8082";

export const getTasks = (userId) =>
  axiosInstance.get(`${TASKS_BASE_URL}/tasks?user_id=${userId}`);

export const createTask = (task) =>
  axiosInstance.post(`${TASKS_BASE_URL}/tasks`, task);

export const updateTask = (taskId, updates) =>
  axiosInstance.put(`${TASKS_BASE_URL}/tasks/${taskId}`, updates);

export const deleteTask = (taskId) =>
  axiosInstance.delete(`${TASKS_BASE_URL}/tasks/${taskId}`);
