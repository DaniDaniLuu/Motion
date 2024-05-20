import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClick, useFloating, useInteractions } from "@floating-ui/react";
import { useState } from "react";

type ChartData = {
  totalSpentAmount: number;
  totalRecievedAmount: number;
  monthYear: string;
}

Chart.register();

const SpendingChart = ({ chartData }: { chartData: ChartData[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  if (chartData.length === 0) {
    return <div>No data available</div>;
  }

  const chartDataWithDatasets = {
    labels: chartData.map((item) => item.monthYear),
    datasets: [
      {
        label: "Total Spent",
        data: chartData.map((item) => item.totalSpentAmount),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        fill: true,
      },
      {
        label: "Total Earned",
        data: chartData.map((item) => item.totalRecievedAmount),
        fill: true,
        backgroundColor: "rgba(75, 220, 71, 0.8)",
        borderColor: "rgba(75, 220, 71, 0.8)",
      },
    ],
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="ml-auto"></div>
        <h1 className="text-center text-lg ">Total Spent vs Total Earned</h1>
        <div
          className="ml-auto "
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <Filter className="h-6 w-6 cursor-pointer" />
        </div>
      </div>

      <Line data={chartDataWithDatasets} />

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="flex flex-col gap-3 text-center">
            <div className="font-bold">Blacklist Transactions</div>
            <div>Implement Later</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SpendingChart;
