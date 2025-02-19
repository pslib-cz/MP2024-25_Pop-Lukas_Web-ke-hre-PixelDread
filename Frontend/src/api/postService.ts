import axiosInstance from "./axiosInstance";

/**
 * Vytvoří nový příspěvek.
 * Data se odesílají jako multipart/form-data.
 *
 * @param formData - FormData obsahující informace o příspěvku a článcích
 * @returns Odpověď z API s uloženým příspěvkem
 */
export const createPost = async (formData: FormData): Promise<any> => {
  console.log("formData", formData.values());
  const response = await axiosInstance.post("/Post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/**
 * Načte všechny příspěvky.
 *
 * @returns Pole příspěvků získaných z API
 */
export const getPosts = async (): Promise<any> => {
  const response = await axiosInstance.get("/Post");
  return response.data;
};

/**
 * Načte příspěvek dle jeho ID.
 *
 * @param id - ID příspěvku
 * @returns Příspěvek s daným ID
 */
export const getPostById = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`/Post/${id}`);
  return response.data;
};

/**
 * Smaže příspěvek dle jeho ID.
 *
 * @param id - ID příspěvku, který se má smazat
 */
export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Post/${id}`);
};

export const getPostsByCategory = async (categoryId: number): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(`/Post/by-category/${categoryId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Pokud není nalezen žádný příspěvek, vrátíme prázdné pole, aniž bychom házeli chybu
      return [];
    }
    // U ostatních chyb je vhodné je předat dál
    throw error;
  }
};
