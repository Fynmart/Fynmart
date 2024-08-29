"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ConfirmAlert from "@/components/imdos-components/ConfirmAlert";
import { Toaster } from "react-hot-toast";

// Create a context for the application
const AppContext = createContext();

// Create a custom hook to access the context
export function useImdosUI() {
  return useContext(AppContext);
}

// Create a provider component to wrap your entire application
export function ImdosProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState(null);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [formModal, setFormModal] = useState({
    show: false,
    data: null,
  });
  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    refId: null,
  });
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const path = pathname.split("/");
    const current = path[path.length - 1];
    const title =
      pathname === "/"
        ? "fynmart"
        : current
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    document.title = title;
  }, [pathname]);

  // Value to be provided by the context
  const contextValue = {
    loading,
    setLoading,
    sideBar,
    setSideBar,
    router,
    confirmAlert,
    setConfirmAlert,
    formModal,
    setFormModal,
    isCartUpdated,
    setIsCartUpdated,
    user,
    setUser,
    trigger,
    setTrigger,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      <Toaster />
      <ConfirmAlert />
    </AppContext.Provider>
  );
}
