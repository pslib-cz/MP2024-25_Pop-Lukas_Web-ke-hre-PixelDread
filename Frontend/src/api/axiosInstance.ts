import axios from "axios";

export const API_URL = "https://localhost:7256/api"; // Uprav podle backendu

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Přidání tokenu do všech požadavků
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosInstance;
