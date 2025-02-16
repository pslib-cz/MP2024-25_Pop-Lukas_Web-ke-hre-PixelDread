import axios from "axios";
import { API_URL } from "./axiosInstance";

interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

// Přihlášení uživatele (POST /api/login)
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
    if (response.data && response.data.accessToken) {
      const token = `${response.data.tokenType} ${response.data.accessToken}`;
      localStorage.setItem("token", token);
      return true;
    } else {
      console.error("Login response does not contain an accessToken", response.data);
      return false;
    }
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    return false;
  }
};

export const register = async (email: string, password: string): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
    return true;
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    return false;
  }
};

// Odhlášení uživatele (POST /api/logout)
export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    localStorage.removeItem("token");
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("token");
  }
};

export const me = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    await axios.get(`${API_URL}/Admin/Me`, {
      headers: { Authorization: token },
    });
    return true;
  } catch (error: any) {
    console.error("Me failed:", error.response?.data || error.message);
    return false;
  }
}