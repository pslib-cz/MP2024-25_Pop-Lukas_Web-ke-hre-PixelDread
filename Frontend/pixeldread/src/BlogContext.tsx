import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState, Blog, Category, BlogCategory,} from './types';
import { useEffect } from 'react';

export const api_url = "https://localhost:7131/api";

type ReducerAction =
| { type: 'LOGIN'; payload: { isUserLoggedIn: boolean; email: string; token: any; } }
| { type: 'LOGOUT'; }
| { type: 'LOAD'; newState: BlogState; }

const blogReducer = (state: BlogState, action: ReducerAction): BlogState => {
    switch (action.type) {
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
