"use client";
import TotalLiquidity from "./components/totalLiquidity";
import TotalCash from "./components/totalCash";
import TotalLiability from "./components/totalLiability";

import { useState, useEffect } from "react";

import { fetchStoredBankInfo } from "@/lib/actions";

interface BankAccountInfo {
  accountId: string;
  balance: number;
  accountType: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
  icon: string | null;
}

const cashAccountStrings = [
  "checking",
  "savings",
  "hsa",
  "cd",
  "money market",
  "prepaid",
  "cash management",
  "ebt",
];
const creditAccountStrings = ["credit card"];

const Dashboard = () => {
  const [bankAccounts, setCurrentBankAccounts] = useState<BankAccountInfo[]>(
    []
  );
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalLiability, setTotalLiability] = useState(0);

  const [totalAccountCount, setTotalAccountCount] = useState(0);
  const [totalCashAccountCount, setTotalCashAccountCount] = useState(0);
  const [totalLiabilityAccountCount, setTotalLiabilityAccountCount] =
    useState(0);

  useEffect(() => {
    const fetchBankInfo = async () => {
      const bankInfo = await fetchStoredBankInfo();
      if (bankInfo) {
        setCurrentBankAccounts(bankInfo);

        // Sortin the accounts
        const filteredCashAccounts = bankInfo.filter((account) =>
          cashAccountStrings.includes(account.accountType)
        );
        const filteredLiabilityAccounts = bankInfo.filter((account) =>
          creditAccountStrings.includes(account.accountType)
        );

        // Setting number of each accounts present
        setTotalAccountCount(bankInfo.length);
        setTotalCashAccountCount(filteredCashAccounts.length);
        setTotalLiabilityAccountCount(filteredLiabilityAccounts.length);

        // Setting values from feteched accounts
        setTotalLiquidity(
          bankInfo.reduce((acc, account) => acc + account.balance, 0)
        );
        setTotalCash(
          filteredCashAccounts.reduce(
            (acc, account) => acc + account.balance,
            0
          )
        );
        setTotalLiability(
          filteredLiabilityAccounts.reduce(
            (acc, account) => acc + account.balance,
            0
          )
        );
      }
    };
    fetchBankInfo();
  }, []);

  return (
    <div>
      <div className="font-bold text-xl">Overview</div>
      <div className="flex flex-row gap-4">
        <TotalLiquidity
          totalLiquidity={totalLiquidity}
          totalAccountCount={totalAccountCount}
        />
        <TotalCash
          totalCash={totalCash}
          totalCashAccountCount={totalCashAccountCount}
        />
        <TotalLiability
          totalLiability={totalLiability}
          totalLiabilityAccountCount={totalLiabilityAccountCount}
        />
      </div>
    </div>
  );
};

export default Dashboard;
