import { ArticleUnion } from "./articles";

export interface Category {
  id: number;
  name: string;
  default?: boolean;
}

export interface PostArticle {
  postId: number;
  articleId: number;
  articleType: number; 
  order: number;
  article: ArticleUnion;
}

export interface PostTag {
  postId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
  };
}

export interface Post {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  visibility: boolean;
  userId: string;
  categoryId?: number;
  category?: Category;
  postArticles: PostArticle[];
  postTags?: PostTag[];
  ogData?: {
    title?: string;
    description?: string;
    fileInformationsId?: number;
    slug?: string;
  };
}

