"use client";
import { createContext, useContext, useState } from "react";

type refreshContextProviderProps = {
  children: React.ReactNode;
};

type refreshContext = {
  triggerRefresh: number;
  setTriggerRefresh: React.Dispatch<React.SetStateAction<number>>;
};

const refreshContext = createContext<refreshContext | null>(null);

export const RefreshContextProvider = ({
  children,
}: refreshContextProviderProps) => {
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  return (
    <refreshContext.Provider value={{ triggerRefresh, setTriggerRefresh }}>
      {children}
    </refreshContext.Provider>
  );
};

export const useRefreshContext = () => {
  const triggerRefresh = useContext(refreshContext);

  if (!triggerRefresh) {
    throw new Error(
      "Cannot use refreshContext outside of refreshContextProvider"
    );
  }

  return triggerRefresh;
};
