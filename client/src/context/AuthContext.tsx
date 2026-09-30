import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function verifyExistingAuth() {
      const token = localStorage.getItem('vanta_admin_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.getCurrentAdmin();
        if (res.success && res.data) {
          setAdmin(res.data);
        } else {
          localStorage.removeItem('vanta_admin_token');
          localStorage.removeItem('vanta_admin_user');
          setAdmin(null);
        }
      } catch (err) {
        console.warn('Auth token validation failed:', err);
        localStorage.removeItem('vanta_admin_token');
        localStorage.removeItem('vanta_admin_user');
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    }

    verifyExistingAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await api.loginAdmin(email, pass);
      if (res.data?.admin) {
        setAdmin(res.data.admin);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('vanta_admin_token');
    localStorage.removeItem('vanta_admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
