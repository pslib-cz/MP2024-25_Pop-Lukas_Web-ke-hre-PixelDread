import axiosInstance from "./axiosInstance";
export const createPost = async (formData: FormData): Promise<any> => {
  const response = await axiosInstance.post("/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/**
 * Načte všechny příspěvky.
 */
export const getPosts = async (): Promise<any> => {
  const response = await axiosInstance.get("/Post");
  return response.data;
};

/**
 * Načte příspěvek dle ID.
 */
export const getPostById = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`/Post/${id}`);
  return response.data;
};

/**
 * Smaže příspěvek dle ID.
 */
export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Post/${id}`);
};

