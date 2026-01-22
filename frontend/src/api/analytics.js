import axios from "axios";

const ANALYTICS_BASE_URL = process.env.REACT_APP_ANALYTICS_BASE_URL || "http://localhost:8000";

const analyticsInstance = axios.create({
  baseURL: ANALYTICS_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getUserStats = (userId) => {
  if (!userId) throw new Error("userId is required");
  return analyticsInstance.get("/user-stats", { params: { user_id: userId } });
};

export const getProductivityTrends = (userId, days = 7) => {
  if (!userId) throw new Error("userId is required");
  return analyticsInstance.get("/productivity", { params: { user_id: userId, days } });
};
