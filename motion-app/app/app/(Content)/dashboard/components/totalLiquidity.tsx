
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";

interface TotalLiquidityProps {
  totalLiquidity: number;
  totalAccountCount: number;
}

const TotalLiquidity = ({
  totalLiquidity,
  totalAccountCount = 0,
}: TotalLiquidityProps) => {
  const [animatedTotalLiquidity, setAnimatedTotalLiquidity] =
    useState(totalLiquidity);

  useEffect(() => {
    if (totalLiquidity > animatedTotalLiquidity) {
      const difference = totalLiquidity - animatedTotalLiquidity;
      const interval = 100 / difference; // Adjust the interval based on your desired animation speed
      let current = animatedTotalLiquidity;

      const timer = setInterval(() => {
        current += 1;
        if (current >= totalLiquidity) {
          clearInterval(timer);
        }
        setAnimatedTotalLiquidity(current);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [totalLiquidity, animatedTotalLiquidity]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="text-primary text-3xl">${animatedTotalLiquidity.toLocaleString()}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TotalLiquidity;
