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

  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Area type="monotone" dataKey="prevMonth" stroke="" fill="" />
        <Area
          type="monotone"
          dataKey="currMonth"
          stroke="lightgreen"
          fill="lightgreen"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SpendingChart;
