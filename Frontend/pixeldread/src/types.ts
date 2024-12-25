
export type BlogState = {
    usertoken: string;
    blogs: Blog[];
    categories: Category[];
    blogCategories: BlogCategory[];
    blogArticles: BlogArticle[];
}

export const defaultState: BlogState = {
    usertoken: '',
    blogs: [],
    categories: [],
    blogCategories: [],
    blogArticles: [],
  };

export interface Blog {
    id: number;
    name: string;
    visibility: boolean;
    categories: Category[];
    articles: BlogArticle[];
    ogData: OGData;
}

export interface Category {
    id: number;
    name: string;
}

export interface ArticlePart
{
    id: number;
}

export interface LinkArticlePart extends ArticlePart
{
    url: string;
    placeholder: string;
}

export interface TextArticlePart extends ArticlePart
{
    content: string;
}

export interface ImageArticlePart extends ArticlePart
{
    media: File;
    description: string;
}
export interface FAQArticlePart extends ArticlePart
{
    question: string;
    answer: string;
}

export interface OGData {
    id: number;
    title: string;
    description: string;
    slug: string;
    media: File;    
}

export interface BlogCategory {
    blogId: number;
    categoryId: number;
}

export interface BlogArticle {
    blogId: number;
    articlePartId: number;
    articleType: ArticleType;
    order: number;
}

enum ArticleType {
    Text = 1,
    Image = 2,
    Link = 3,
    Video = 4
}