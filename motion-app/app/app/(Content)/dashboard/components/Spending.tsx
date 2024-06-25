import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SpendingChart from "./spendingChart";
import { TransactionInfo } from "@/lib/types";

type chartData = {
  daySince: number;
  prevMonth?: number;
  currMonth?: number;
};

type SpendingProps = {
  transactionInfo: TransactionInfo[];
};

function convertToChartData(transactions: TransactionInfo[]): chartData[] {
  const sortedTransactions: TransactionInfo[] = transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const currentMonth = new Date().getMonth() + 1;
  const prevMonth = currentMonth - 1;

  // Object with the key being the day of the month and the value being an array of { daySince: number, prevMonth?: number, currMonth?: number } for each transaction
  const aggregatedTransactions = sortedTransactions.reduce(
    (acc: { [key: number]: chartData[] }, transaction: TransactionInfo) => {
      const date = new Date(transaction.date.replace(/-/g, "/"));
      const transactionMonth = date.getMonth() + 1;
      const transactionDay = date.getDate();

      if (transactionMonth == currentMonth) {
        if (!acc[transactionDay]) {
          acc[transactionDay] = [];
        }
        acc[transactionDay].push({
          daySince: transactionDay,
          currMonth: transaction.amount,
        });
      } else if (transactionMonth == prevMonth) {
        if (!acc[transactionDay]) {
          acc[transactionDay] = [];
        }
        acc[transactionDay].push({
          daySince: transactionDay,
          prevMonth: transaction.amount,
        });
      }
      return acc;
    },
    {}
  );

  // Simplify the transaction data to an array of { daySince: number, prevMonth?: number, currMonth?: number }
  // Where the prevMont and currMonth are the sum of all the transactions for that day for the prevMonth and currentMonth
  let totalAmountTransactions = [];
  for (const key in aggregatedTransactions) {
    let totalAmount = 0;
    let monthType = "";
    if (aggregatedTransactions[key][0].prevMonth) {
      monthType = "prevMonth";
    } else {
      monthType = "currMonth";
    }
    for (const transaction of aggregatedTransactions[key]) {
      totalAmount += transaction.currMonth || 0;
      totalAmount += transaction.prevMonth || 0;
    }
    totalAmountTransactions.push({
      daySince: Number(key),
      [monthType]: totalAmount,
    });
  }

  //
  let accumulatedTransactions = [];
  let accumulatedPrevMonth = 0;
  let accumulatedCurrMonth = 0;
  const currentDay = new Date().getDate();

  for (const transaction of totalAmountTransactions) {
    accumulatedPrevMonth += transaction.prevMonth || 0;

    if (transaction.daySince <= currentDay) {
      accumulatedCurrMonth += transaction.currMonth || 0;
    } else {
      accumulatedCurrMonth = 0;
    }

    accumulatedTransactions.push({
      daySince: transaction.daySince,
      prevMonth: accumulatedPrevMonth,
      currMonth: accumulatedCurrMonth,
    });
  }

  return accumulatedTransactions;
}

const Spending = ({ transactionInfo }: SpendingProps) => {
  const chartData = convertToChartData(transactionInfo);
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardDescription>Spending</CardDescription>
        <CardTitle className="text-primary text-3xl">
          This month vs. last month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SpendingChart chartData={chartData}></SpendingChart>
      </CardContent>
    </Card>
  );
};

export default Spending;
