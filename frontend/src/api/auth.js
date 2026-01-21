import axiosInstance from "./axiosInstance";

const AUTH_BASE_URL = "http://localhost:8082";

export const register = (data) =>
  axiosInstance.post(`${AUTH_BASE_URL}/register`, data);
export const login = (data) =>
  axiosInstance.post(`${AUTH_BASE_URL}/login`, data);
