"use client";
import TotalLiquidity from "./components/totalLiquidity";
import { useState, useEffect } from "react";
import { fetchStoredTransactions } from "@/lib/actions";
import { useBankAccountContext } from "@/components/context/BankAccountContextProvider";
import RecentTransactions from "./components/RecentTransactions";
import Spending from "./components/Spending";
import { TransactionInfo } from "@/lib/types";

const Dashboard = () => {
  const { bankAccounts } = useBankAccountContext();
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo[]>([]);
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [totalAccountCount, setTotalAccountCount] = useState(0);

  const fetchBankInfo = async () => {
    const bankInfo = bankAccounts;
    if (bankInfo) {
      setTotalAccountCount(bankInfo.length);
      setTotalLiquidity(
        bankInfo.reduce((acc, account) => acc + account.balance, 0)
      );

      const fetchedTransactions = await fetchStoredTransactions(bankInfo);
      if (fetchedTransactions) {
        setTransactionInfo(fetchedTransactions);
      }
    }
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  useEffect(() => {
    fetchBankInfo();
  }, [bankAccounts]);

  return (
    <>
      <div className="font-bold text-2xl text-primary py-3 px-5 bg-background">
        Overview
      </div>
      <div className="flex flex-col gap-4 p-5">
        <TotalLiquidity
          totalLiquidity={totalLiquidity}
          totalAccountCount={totalAccountCount}
        />
        <Spending transactionInfo={transactionInfo}></Spending>
        <RecentTransactions
          transactionInfo={transactionInfo}
        ></RecentTransactions>
      </div>
    </>
  );
};

export default Dashboard;
