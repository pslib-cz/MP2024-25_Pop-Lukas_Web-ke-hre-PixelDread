import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState } from './types';
export const BlogContext = createContext<{
    state: BlogState;
    dispatch: React.Dispatch<ReducerAction>;
  }>({ state: defaultState, dispatch: () => {} });
  
  export const QuoteProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, defaultState);
  
    return (
      <BlogContext.Provider value={{ state, dispatch }}>
        {children}
      </BlogContext.Provider>
    );
  }