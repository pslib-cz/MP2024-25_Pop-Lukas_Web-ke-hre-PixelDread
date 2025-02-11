import axiosInstance from "./axiosInstance"; 
import { Article, ArticleUnion} from "../types/articles";

/**
 * Získá všechny články (případně včetně příslušných Postů).
 * Vyžaduje na serveru endpoint: GET /api/Article
 */
export const getAllArticles = async (): Promise<Article[]> => {
  const response = await axiosInstance.get("/Article");
  return response.data; // očekáváme pole Article
};

/**
 * Získá článek podle ID.
 * Vyžaduje na serveru endpoint: GET /api/Article/{id}
 */
export const getArticleById = async (id: number): Promise<Article> => {
  const response = await axiosInstance.get(`/Article/${id}`);
  return response.data; // očekáváme jeden článek (Article)
};

/**
 * Získá všechny články, které patří k danému příspěvku (postId).
 * Vyžaduje na serveru endpoint: GET /api/Article/by-post/{postId}
 * (endpoint si musíte případně vytvořit)
 */
export const getArticlesByPostId = async (postId: number): Promise<ArticleUnion[]> => {
    const response = await axiosInstance.get(`/Article/by-post/${postId}`);
    return response.data;
  };