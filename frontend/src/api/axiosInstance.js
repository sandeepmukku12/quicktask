import axios from "axios";

const axiosInstance = axios.create({
  // default, can override in individual APIs
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");

      // redirect to login if token invalid
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
