import axiosInstance from "./axiosInstance";


export const getTags = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/Tag");
  return response.data;
};

export const createTag = async (name: string): Promise<any> => {
  const response = await axiosInstance.post("/Tag", { name });
  return response.data;
};

export const updateTag = async (id: number, tagData: any): Promise<any> => {
    // Ujistěte se, že tagData obsahuje také id, které odpovídá parametru id
    return axiosInstance.put(`/Tag/${id}`, tagData).then(res => res.data);
  };
  

export const deleteTag = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Tag/${id}`);
};
