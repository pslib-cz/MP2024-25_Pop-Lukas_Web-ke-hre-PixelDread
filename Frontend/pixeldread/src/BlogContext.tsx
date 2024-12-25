import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState } from './types';

export const api_url = "https://localhost:7126/api";

type ReducerAction =
| { type: 'FETCH_TAGS_REQUEST' }
| { type: 'FETCH_TAGS_SUCCESS'; }

const blogReducer = (state: BlogState, action: ReducerAction): BlogState => {
    switch (action.type) {
        case 'FETCH_TAGS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_TAGS_SUCCESS':
            return { ...state, loading: false, error: null };
        default:
            return state;
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