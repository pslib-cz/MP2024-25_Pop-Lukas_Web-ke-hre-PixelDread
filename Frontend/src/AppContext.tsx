import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { useEffect } from 'react';
import { AppState } from './Types';
export const api_url = "https://localhost:7256/api";

const defaultState: AppState = {
    token: null,
    adminId: null,
    isLoggedIn: false,
    email: '',
    loading: false,
    error: null,
  };

type ReducerAction =
| { type: 'LOGIN'; payload: { isLoggedIn: boolean; email: string; token: any; } }
| { type: 'LOGOUT'; }
| { type: 'LOAD'; newState: AppState; };

const appReducer = (state: AppState, action: ReducerAction): AppState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                email: action.payload.email,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                email: '',
                token: '',
                adminId: null,
            };
        case 'LOAD':
            return action.newState;
    }
}
export const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<ReducerAction>;
  }>({ state: defaultState, dispatch: () => {} });

  export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    
    const initialState = (() => {
        const storedState = sessionStorage.getItem('appState');
        return storedState ? JSON.parse(storedState) : defaultState;
    })();

    const [state, dispatch] = useReducer(appReducer, initialState);
    useEffect(() => {
        sessionStorage.setItem('appState', JSON.stringify(state));
    }, [state]);

    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    );
  }