"use client";
import { FormType, columns } from "./columns";
import { DataTable } from "./data-table";
import { useBankAccountContext } from "@/components/context/BankAccountContextProvider";
import { useEffect, useState } from "react";
import { fetchStoredTransactions, getBankIcon } from "@/lib/actions";
import { db } from "@/lib/db";

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

const Transaction = () => {
  const { bankAccounts, setBankAccounts } = useBankAccountContext();
  const [data, setData] = useState<FormType[]>([]);

  async function getData(bankAccounts: BankAccountInfo[]) {
    const transactions = await fetchStoredTransactions(bankAccounts);
    const returnData: FormType[] = [];

    if (transactions) {
      for (const transaction of transactions) {
        const bankImageString = await getBankIcon(transaction.accountId);
        const FormObject = {
          bank: bankImageString,
          date: transaction.date,
          description: transaction.category[0],
          type: transaction.merchantName ? transaction.merchantName : "None",
          amount: transaction.amount,
        };
        returnData.push(FormObject);
      }
    }

    setData(returnData);
  }

  useEffect(() => {
    getData(bankAccounts);
  }, []);

  useEffect(() => {
    getData(bankAccounts);
  }, [bankAccounts]);

  return (
    <div className="flex flex-col font-bold text-xl">
      Transaction History
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Transaction;
