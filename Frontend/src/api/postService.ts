import axiosInstance from "./axiosInstance";

// Opravený endpoint: "/post" (nikoliv "/posts")
export const createPost = async (formData: FormData) => {
  const response = await axiosInstance.post("/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getPosts = async () => {
  const response = await axiosInstance.get("/Post");
  return response.data;
};

export const getPostById = async (id: number) => {
  const response = await axiosInstance.get(`/Post/${id}`);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axiosInstance.delete(`/Post/${id}`);
};
