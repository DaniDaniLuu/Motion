import { chartData } from "@/lib/types";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

type SpendingChartProps = {
  chartData: chartData[] 
};

const SpendingChart = ({ chartData }: SpendingChartProps) => {
  console.log("Chart gets rendered");

  return (
    <ResponsiveContainer width="80%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="daySince"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickCount={9}
        />
        <YAxis />
        <Tooltip />
        <Area
          dot={{ stroke: "red", strokeWidth: 2 }}
          type="monotone"
          dataKey="prevMonth"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          dot={{ stroke: "red", strokeWidth: 2 }}
          type="monotone"
          dataKey="currMonth"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SpendingChart;
