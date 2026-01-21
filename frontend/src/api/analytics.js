import axios from "axios";

const ANALYTICS_BASE_URL = "http://localhost:8000";

const analyticsInstance = axios.create({
  baseURL: process.env.REACT_APP_ANALYTICS_BASE_URL || ANALYTICS_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
analyticsInstance.interceptors.request.use((config) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser?.token) {
    config.headers.Authorization = `Bearer ${storedUser.token}`;
  }
  return config;
});

export const getUserStats = (userId) =>
  analyticsInstance.get(`/user-stats?user_id=${userId}`);

export const getProductivity = (userId, days = 7) =>
  analyticsInstance.get(`/productivity?user_id=${userId}&days=${days}`);
