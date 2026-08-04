"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "@/services/auth.service";
import { storage } from "@/lib/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = storage.getToken();
    const savedUser = storage.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }

    setIsLoading(false);
  }, []);

  const persistSession = useCallback((nextUser, nextToken) => {
    storage.setUser(nextUser);
    storage.setToken(nextToken);
    setUser(nextUser);
    setToken(nextToken);
  }, []);

  const register = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      persistSession(data.user, data.token);
      return data;
    },
    [persistSession]
  );

  const login = useCallback(
    async (payload) => {
      const data = await authService.login(payload);
      persistSession(data.user, data.token);
      return data;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    storage.clear();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      register,
      login,
      logout,
    }),
    [user, token, isLoading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
