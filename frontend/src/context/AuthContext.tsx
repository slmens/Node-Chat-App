"use client";

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<any>(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only in the client-side context
      localStorage.getItem("token") || null;
    }
  });
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only in the client-side context
      localStorage.getItem("userId") || null;
    }
  });

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
