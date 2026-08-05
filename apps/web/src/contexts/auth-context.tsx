import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { demoUser } from '@/data/mock';
import type { User } from '@/types/models';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('investime-user');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('investime-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('investime-user');
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: async (email) => {
        setUser({ ...demoUser, email });
      },
      register: async (name, email) => {
        setUser({ ...demoUser, name, email });
      },
      logout: () => setUser(null),
      updateProfile: (updates) => {
        setUser((current) => (current ? { ...current, ...updates } : current));
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
