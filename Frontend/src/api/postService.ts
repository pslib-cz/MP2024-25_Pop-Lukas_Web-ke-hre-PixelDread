import axiosInstance from "./axiosInstance";

export const getPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const getPostById = async (id: number) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (name: string, categoryId: number) => {
  const response = await axiosInstance.post("/posts", { name, categoryId });
  return response.data;
};

export const deletePost = async (id: number) => {
  await axiosInstance.delete(`/posts/${id}`);
};
