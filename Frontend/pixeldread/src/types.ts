
export type BlogState = {
    userToken: string;
    isUserLoggedIn: boolean;
    email: string;
    blogs: Blog[];
    categories: Category[];
    blogCategories: BlogCategory[];
    loading: boolean,
    error: null | string,
    draft: Blog,
    step: number,
}

const draftDefault : Blog = ({ 
    id: null,
    name: '',
    visibility: true,
    categories: [],
    ogData: {
      id: null,
      title: '',
      description: '',
      keywords: [],
      slug: '',
      media: null,
    },
    content: '',
  });

export const defaultState: BlogState = {
    userToken: '',
    isUserLoggedIn: false,
    email: '',
    blogs: [],
    categories: [],
    blogCategories: [],
    loading: false,
    error: null,
    draft: draftDefault,
    step: 1,
  };

export interface Blog {
    id: number | null;
    name: string;
    visibility: boolean;
    categories: Category[];
    ogData: OGData;
    content: string;
}

export interface Category {
    id: number;
    name: string;
    basic: boolean | null;
}

export interface OGData {
    id: number | null;
    title: string;
    description: string;
    keywords: string[];
    slug: string;
    media: File | null;    
}

export interface BlogCategory {
    blogId: number;
    categoryId: number;
}

export type option = {
    value: string;
    label: string;
}
