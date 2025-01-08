
export type BlogState = {
    userToken: string;
    isUserLoggedIn: boolean;
    email: string;
    blogs: Blog[];
    categories: Category[];
    blogCategories: BlogCategory[];
    blogArticles: BlogArticle[];
    loading: boolean,
    error: null | string,
}

export const defaultState: BlogState = {
    userToken: '',
    isUserLoggedIn: false,
    email: '',
    blogs: [],
    categories: [],
    blogCategories: [],
    blogArticles: [],
    loading: false,
    error: null,
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
    media: File | null;
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
    keywords: string;
    slug: string;
    media: File | null;    
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
export type BlogDraft = {
    blog: Blog | null;
    ogData: OGData | null;
    categories: Category[];
    FAQArticleParts: FAQArticlePart[] ;
    TextArticleParts: TextArticlePart[];
    ImageArticleParts: ImageArticlePart[];
    LinkArticleParts: LinkArticlePart[];
}

enum ArticleType {
    Text = 1,
    Image = 2,
    Link = 3,
    Video = 4
}

export type option {
    value: string;
    label: string;
}