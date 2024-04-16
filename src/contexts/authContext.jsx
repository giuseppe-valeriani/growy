import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
  console.log(authUser);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
