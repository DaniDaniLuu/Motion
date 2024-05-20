"use client";
import { createContext, useContext, useState } from "react";

type refreshContextProviderProps = {
  children: React.ReactNode;
};

const refreshContext = createContext<boolean | null>(null);

const refreshContextProvider = ({ children }: refreshContextProviderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <refreshContext.Provider value={isRefreshing}>
      {children}
    </refreshContext.Provider>
  );
};

export const useRefreshContext = () => {
  const isRefreshing = useContext(refreshContext);

  if (!isRefreshing) {
    throw new Error(
      "Cannot use refreshContext outside of refreshContextProvider"
    );
  }

  return isRefreshing;
};

export default refreshContext;
