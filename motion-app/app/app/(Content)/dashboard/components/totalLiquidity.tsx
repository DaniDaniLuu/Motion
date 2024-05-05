import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalLiquidityProps {
  totalLiquidity: number;
  totalAccountCount: number;
}

const TotalLiquidity = ({
  totalLiquidity,
  totalAccountCount = 0,
}: TotalLiquidityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Liquidity</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold">
        <p>${totalLiquidity}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalAccountCount} account
          {totalAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalLiquidity;
