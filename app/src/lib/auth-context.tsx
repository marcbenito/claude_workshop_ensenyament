"use client";

import * as React from "react";

import type { PublicUser } from "@/lib/types";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type AuthResult,
} from "@/lib/services/auth";

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<PublicUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Rehidratar la sesión desde localStorage al montar.
  React.useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = React.useCallback((email: string, password: string) => {
    const result = loginUser({ email, password });
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const register = React.useCallback(
    (name: string, email: string, password: string) => {
      const result = registerUser({ name, email, password });
      if (result.ok) setUser(result.user);
      return result;
    },
    []
  );

  const logout = React.useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}
