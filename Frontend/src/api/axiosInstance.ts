import axios from "axios";

export const API_URL = "https://localhost:7256/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Intercepted 401 - token is invalid or expired. Logging out.");
      localStorage.removeItem("token");

      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
