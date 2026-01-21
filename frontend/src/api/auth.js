import axiosInstance from "./axiosInstance";

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL || "http://localhost:8082/api";

export const register = (data) =>
  axiosInstance.post(`${AUTH_BASE_URL}/auth/register`, data);
export const login = (data) =>
  axiosInstance.post(`${AUTH_BASE_URL}/auth/login`, data);
