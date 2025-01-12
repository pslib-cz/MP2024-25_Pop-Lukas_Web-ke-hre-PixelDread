import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { BlogState, defaultState, Blog, Category, BlogCategory, OGData,} from './types';
import { useEffect } from 'react';

export const api_url = "https://localhost:7131/api";

type ReducerAction =
| { type: 'LOGIN'; payload: { isUserLoggedIn: boolean; email: string; token: any; } }
| { type: 'LOGOUT'; }
| { type: 'LOAD'; newState: BlogState; }

| { type: 'SET_DRAFT_CATEGORIES'; payload: Category[]; }
| { type: 'SET_DRAFT_NAME'; payload: string; }
| { type: 'SET_DRAFT_VISIBILITY'; payload: boolean; }
| { type: 'SET_DRAFT_CONTENT'; payload: string; }
| { type: 'SET_DRAFT_OGDATA'; payload: OGData; }
| { type: 'RESET_DRAFT'; }
| { type: 'SET_STEP'; payload: number; }


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
        case 'SET_DRAFT_CATEGORIES':
            if (state.draft === null) return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    categories: action.payload,
                },
            };
        case 'SET_DRAFT_NAME':
            if (state.draft === null) return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    name: action.payload,
                },
            };
        case 'SET_DRAFT_VISIBILITY':
            if (state.draft === null) return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    visibility: action.payload,
                },
            };
        case 'SET_DRAFT_CONTENT':
            if (state.draft === null) return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    content: action.payload,
                },
            };
        case 'SET_DRAFT_OGDATA':
            if (state.draft === null) return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    ogData: action.payload,
                },
            };
        case 'RESET_DRAFT':
            return {
                ...state,
                draft: defaultState.draft,
                step: 1,
            };
        case 'SET_STEP':
            return {
                ...state,
                step: action.payload,
            };
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
