import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NetWorthChart from "./netWorthChart";

const NetWorth = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="text-primary text-3xl">
          
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NetWorthChart></NetWorthChart>
      </CardContent>
    </Card>
  );
};

export default NetWorth;
