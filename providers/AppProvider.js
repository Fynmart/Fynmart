"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the application
const AppContext = createContext();

// Create a custom hook to access the context
export function useAppContext() {
  return useContext(AppContext);
}

// Create a provider component to wrap your entire application
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  // Value to be provided by the context
  const contextValue = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
