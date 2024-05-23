"use client";
import TotalLiquidity from "./components/totalLiquidity";
import TotalCash from "./components/totalCash";
import TotalLiability from "./components/totalLiability";
import SpendingChart from "./components/spendingChart";
import TotalInvested from "./components/totalInvested";
import { useState, useEffect } from "react";
import { fetchStoredBankInfo, fetchStoredTransactions } from "@/lib/actions";
import { FormType, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useRefreshContext } from "@/components/context/RefreshContextProvider";

interface BankAccountInfo {
  accountId: string;
  balance: number;
  accountType: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
  icon: string | null;
}

interface TransactionInfo {
  transactionId: string;
  accountId: string;
  amount: number;
  category: Array<string>;
  merchantName: string | null;
  merchantLogo: string | null;
  date: string;
  cursor: string;
}

type ChartData = {
  totalSpentAmount: number;
  totalRecievedAmount: number;
  monthYear: string;
};

interface aggTransactionInfo {
  totalSpentAmount: number;
  monthYear: string;
}

const cashAccountStrings = ["depository"];
const creditAccountStrings = ["credit"];
const investmentAccountStrings = ["investment"];

function getFiveMostRecentTransactions(transactions: any[]) {
  const sortedTransactions = transactions.sort((b, a) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  const fiveMostRecentTransactions = sortedTransactions.slice(0, 5);
  return fiveMostRecentTransactions;
}

function aggregateTransactionsByMonth(transactions: any[]): ChartData[] {
  const sortedTransactions = transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const aggregatedTransactions = sortedTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = {
          monthYear,
          totalSpentAmount: 0,
          totalRecievedAmount: 0,
        };
      }
      if (transaction.amount > 0) {
        acc[monthYear].totalSpentAmount += transaction.amount;
        acc[monthYear].totalRecievedAmount += 0;
      } else {
        acc[monthYear].totalRecievedAmount += transaction.amount * -1;
        acc[monthYear].totalSpentAmount += 0;
      }
      return acc;
    },
    {}
  );

  return Object.values(aggregatedTransactions);
}

const Dashboard = () => {
  const { triggerRefresh, setTriggerRefresh } = useRefreshContext();
  const [bankAccounts, setCurrentBankAccounts] = useState<BankAccountInfo[]>(
    []
  );
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
  const [fiveMostRecentTransactions, setFiveMostRecentTransactions] = useState<
    TransactionInfo[]
  >([]);
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalLiability, setTotalLiability] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);

  const [totalAccountCount, setTotalAccountCount] = useState(0);
  const [totalCashAccountCount, setTotalCashAccountCount] = useState(0);
  const [totalLiabilityAccountCount, setTotalLiabilityAccountCount] =
    useState(0);
  const [totalInvestmentAccountCount, setTotalInvestmentAccountCount] =
    useState(0);
  const [spendingChartData, setSpendingChartData] = useState<ChartData[]>([])

  const fetchBankInfo = async () => {
    const bankInfo = await fetchStoredBankInfo();
    if (bankInfo) {
      setCurrentBankAccounts(bankInfo);

      // Sorting the accounts
      const filteredCashAccounts = bankInfo.filter((account) =>
        cashAccountStrings.includes(account.accountCategory)
      );
      const filteredLiabilityAccounts = bankInfo.filter((account) =>
        creditAccountStrings.includes(account.accountCategory)
      );
      const filteredInvestmentAccounts = bankInfo.filter((account) =>
        investmentAccountStrings.includes(account.accountCategory)
      );

      // Setting number of each accounts present
      setTotalAccountCount(bankInfo.length);
      setTotalCashAccountCount(filteredCashAccounts.length);
      setTotalLiabilityAccountCount(filteredLiabilityAccounts.length);
      setTotalInvestmentAccountCount(filteredInvestmentAccounts.length);

      // Setting values from feteched accounts
      setTotalLiquidity(
        bankInfo.reduce((acc, account) => acc + account.balance, 0)
      );
      setTotalCash(
        filteredCashAccounts.reduce((acc, account) => acc + account.balance, 0)
      );
      setTotalLiability(
        filteredLiabilityAccounts.reduce(
          (acc, account) => acc + account.balance,
          0
        )
      );
      setTotalInvested(
        filteredInvestmentAccounts.reduce(
          (acc, account) => acc + account.balance,
          0
        )
      );
    }

    // Now fetching transactions
    const fetchedTransactions = await fetchStoredTransactions();
    if (fetchedTransactions) {
      let chartData = aggregateTransactionsByMonth(fetchedTransactions)
      setSpendingChartData([...chartData]);
      setFiveMostRecentTransactions(
        getFiveMostRecentTransactions(fetchedTransactions)
      );
    }
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  useEffect(() => {
    fetchBankInfo();
  }, [triggerRefresh]);

  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];

  return (
    <div>
      <div className="font-bold text-xl">Overview</div>
      <div className="flex flex-row gap-4">
        <div>
          <TotalLiquidity
            totalLiquidity={totalLiquidity}
            totalAccountCount={totalAccountCount}
          />
          <div className="flex flex-row gap-4 pb-4">
            <TotalCash
              totalCash={totalCash}
              totalCashAccountCount={totalCashAccountCount}
            />
            <TotalLiability
              totalLiability={totalLiability}
              totalLiabilityAccountCount={totalLiabilityAccountCount}
            />
            <TotalInvested
              totalInvested={0}
              totalInvestmentAccountCount={0}
            ></TotalInvested>
          </div>
          <SpendingChart
            chartData={spendingChartData}
          />
        </div>
        <div>
          <DataTable columns={columns} data={fiveMostRecentTransactions as any} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
