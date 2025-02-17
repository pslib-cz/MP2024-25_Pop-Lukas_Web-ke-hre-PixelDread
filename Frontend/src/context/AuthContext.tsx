import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginService, logout as logoutService, me } from "../api/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
  refreshAuth: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Inicializace stavu podle tokenu
  useEffect(() => {
    const checkAuth = async () => {
      const valid = await me();
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const success = await loginService(email, password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const logout = async (): Promise<void> => {
    await logoutService();
    setIsAuthenticated(false);
  };

  // Funkce pro obnovení ověření (například volána po změně tokenu)
  const refreshAuth = async () => {
    const valid = await me();
    setIsAuthenticated(valid);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
