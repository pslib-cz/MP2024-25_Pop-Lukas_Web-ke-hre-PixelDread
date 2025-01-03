import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState, Blog, Category, BlogCategory, BlogArticle, FAQArticlePart, TextArticlePart, LinkArticlePart, ImageArticlePart  } from './types';

export const api_url = "https://localhost:7131/api";

type ReducerAction =
| { type: 'FIRST_FETCH' }
| { type: 'FIRST_FETCH_SUCCESS'; blogs: Blog[]; categories: Category[]; blogCategories: BlogCategory[]; blogArticles: BlogArticle[]; FAQArticleParts: FAQArticlePart[]; TextArticleParts: TextArticlePart[]; ImageArticleParts: ImageArticlePart[]; LinkArticleParts: LinkArticlePart[]; }
| { type: 'FETCH_ERROR'; error: string; }
| { type: 'LOGIN'; payload: { isUserLoggedIn: boolean; email: string; token: any; } }
| { type: 'LOGOUT'; };

const blogReducer = (state: BlogState, action: ReducerAction): BlogState => {
    switch (action.type) {
        case 'FIRST_FETCH': 
            return {
                ...state,
                loading: true,
            };
        case 'FIRST_FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                blogs: action.blogs,
                categories: action.categories,
                blogCategories: action.blogCategories,
                blogArticles: action.blogArticles,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case 'LOGIN':
            return {
                ...state,
                isUserLoggedIn: action.payload.isUserLoggedIn,
                email: action.payload.email,
                userToken: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                isUserLoggedIn: false,
                email: '',
                userToken: '',
            };

    }
}


export const BlogContext = createContext<{
    state: BlogState;
    dispatch: React.Dispatch<ReducerAction>;
  }>({ state: defaultState, dispatch: () => {} });
  export const BlogProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, defaultState);
  
    return (
      <BlogContext.Provider value={{ state, dispatch }}>
        {children}
      </BlogContext.Provider>
    );
  }
