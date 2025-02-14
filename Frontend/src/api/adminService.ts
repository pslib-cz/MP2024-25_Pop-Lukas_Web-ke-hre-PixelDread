import axiosInstance from "./axiosInstance";
import { Admin } from "../types/admin";

export const getAdmins = async (): Promise<Admin[]> => {
  const response = await axiosInstance.get("/Admin");
  return response.data;
};

export const getCurrentUserId = async (): Promise<string> => {
  const response = await axiosInstance.get("/Admin/CurrentUserId");
  return response.data;
};

export const createAdmin = async (email: string, password: string, secured: string): Promise<Admin> => {
    const response = await axiosInstance.post("/Register", { email, password, secured });
    return response.data;
};

export const deleteAdmin = async (id: string): Promise<Admin> => {
  const response = await axiosInstance.delete(`/Admin/DeleteAdmin/${id}`);
  return response.data;
};
