import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { FormType, columns } from "./columns";
import { TransactionInfo } from "../page";
import { useEffect, useState } from "react";

type RecentTransactionsProps = {
  transactionInfo: TransactionInfo[];
};

function getFiveMostRecentTransactions(
  transactions: TransactionInfo[]
): FormType[] {
  const sortedTransactions = transactions.sort((b, a) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  const fiveTransactions = sortedTransactions.slice(0, 5);
  const fiveMostRecentTransactions = fiveTransactions.map(
    (transaction: TransactionInfo) => ({
      date: transaction.date,
      amount: transaction.amount,
      merchantName: transaction.merchantName
        ? transaction.merchantName
        : "None",
    })
  );
  return fiveMostRecentTransactions;
}

const RecentTransactions = ({ transactionInfo }: RecentTransactionsProps) => {
  console.log("Recent Transactions Rendered");

  let fiveMostRecent;
  if (transactionInfo.length > 0) {
    fiveMostRecent = getFiveMostRecentTransactions(transactionInfo);
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardDescription>Transactions</CardDescription>
        <CardTitle className="text-primary text-3xl">Most recent</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={fiveMostRecent? fiveMostRecent : []} />
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
