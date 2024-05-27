"use client";
import { createContext, useContext, useState } from "react";

interface BankAccountInfo {
  accountId: string;
  balance: number;
  icon: string | null;
  accountType: string;
  accountCategory: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
}

type bankContextProviderProps = {
  children: React.ReactNode;
};

type bankContext = {
  bankAccounts: BankAccountInfo[];
  setBankAccounts: React.Dispatch<React.SetStateAction<BankAccountInfo[]>>;
};

const bankAccountContext = createContext<bankContext | null>(null);

export const BankAccountContextProvider = ({
  children,
}: bankContextProviderProps) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountInfo[]>([]);

  return (
    <bankAccountContext.Provider value={{ bankAccounts, setBankAccounts }}>
      {children}
    </bankAccountContext.Provider>
  );
};

export const useBankAccountContext = () => {
  const bankAccounts = useContext(bankAccountContext);

  if (!bankAccounts) {
    throw new Error(
      "Cannot use refreshContext outside of refreshContextProvider"
    );
  }

  return bankAccounts;
};
