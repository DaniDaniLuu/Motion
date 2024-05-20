"use client";
import { createContext, useContext, useState } from "react";

type refreshContextProviderProps = {
  children: React.ReactNode;
};

type refreshContext = {
  isRefreshing: boolean;
  setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
};

const refreshContext = createContext<refreshContext | null>(null);

export const RefreshContextProvider = ({
  children,
}: refreshContextProviderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <refreshContext.Provider value={{ isRefreshing, setIsRefreshing }}>
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
