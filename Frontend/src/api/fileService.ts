import axiosInstance from "./axiosInstance";
import { API_URL } from "./axiosInstance";
export const uploadFile = async (file: File): Promise<{ id: number; fileName: string; filePath: string; [key: string]: any }> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch(`${API_URL}/File/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`File upload failed with status ${response.status}`);
  }
  return response.json();
};

export const getFileById = async (id: number): Promise<Blob> => {
  const response = await axiosInstance.get(`/File/${id}`, {
    responseType: "blob", // important for receiving file data
  });
  return response.data;
};


export default uploadFile;