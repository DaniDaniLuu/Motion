"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalInvestedProps {
  totalInvested: number;
  totalInvestmentAccountCount: number;
}

const TotalInvested = ({
  totalInvested,
  totalInvestmentAccountCount,
}: TotalInvestedProps) => {
  const [animatedTotal, setAnimatedTotal] = useState(totalInvested);

  useEffect(() => {
    if (totalInvested > animatedTotal) {
      const difference = totalInvested - animatedTotal;
      const interval = 50 / difference; // Adjust the interval based on your desired animation speed
      let current = animatedTotal;

      const timer = setInterval(() => {
        current += 1;
        if (current >= totalInvested) {
          clearInterval(timer);
        }
        setAnimatedTotal(current);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [totalInvested, animatedTotal]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Investments</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold">
        <p>${animatedTotal}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalInvestmentAccountCount} account
          {totalInvestmentAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalInvested;
