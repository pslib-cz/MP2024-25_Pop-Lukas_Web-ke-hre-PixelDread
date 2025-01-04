import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState, Blog, Category, BlogCategory, BlogArticle, FAQArticlePart, TextArticlePart, LinkArticlePart, ImageArticlePart  } from './types';
import { useEffect } from 'react';

export const api_url = "https://localhost:7131/api";

type ReducerAction =
| { type: 'FIRST_FETCH' }
| { type: 'FIRST_FETCH_SUCCESS'; blogs: Blog[]; categories: Category[]; blogCategories: BlogCategory[]; blogArticles: BlogArticle[]; FAQArticleParts: FAQArticlePart[]; TextArticleParts: TextArticlePart[]; ImageArticleParts: ImageArticlePart[]; LinkArticleParts: LinkArticlePart[]; }
| { type: 'FETCH_ERROR'; error: string; }
| { type: 'LOGIN'; payload: { isUserLoggedIn: boolean; email: string; token: any; } }
| { type: 'LOGOUT'; }
| { type: 'LOAD'; newState: BlogState; }

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
        case 'LOAD':
            return action.newState;
        

    }
}


export const BlogContext = createContext<{
    state: BlogState;
    dispatch: React.Dispatch<ReducerAction>;
  }>({ state: defaultState, dispatch: () => {} });

  export const BlogProvider: React.FC<PropsWithChildren> = ({ children }) => {
    
    const initialState = (() => {
        const storedState = sessionStorage.getItem('blogState');
        return storedState ? JSON.parse(storedState) : defaultState;
    })();

    const [state, dispatch] = useReducer(blogReducer, initialState);
    useEffect(() => {
        sessionStorage.setItem('blogState', JSON.stringify(state));
    }, [state]);

    return (
      <BlogContext.Provider value={{ state, dispatch }}>
        {children}
      </BlogContext.Provider>
    );
  }
