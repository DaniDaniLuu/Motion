"use client";
import { FormType, columns } from "./columns";
import { DataTable } from "./data-table";
import { useBankAccountContext } from "@/components/context/BankAccountContextProvider";
import { useEffect, useState } from "react";
import { fetchStoredTransactions, getBankIcon } from "@/lib/actions";
import { BankAccountInfo } from "@/lib/types";

const Transaction = () => {
  const { bankAccounts } = useBankAccountContext();
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
    <>
      <div className="font-bold text-2xl text-primary py-3 px-5 bg-background">
        Transaction History
      </div>
      <div className="gap-4 p-5 pt-2">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Transaction;
