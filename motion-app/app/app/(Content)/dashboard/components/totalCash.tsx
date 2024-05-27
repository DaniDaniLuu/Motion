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

interface TotalCashProps {
  totalCash: number;
  totalCashAccountCount: number;
}

const TotalCash = ({
  totalCash,
  totalCashAccountCount = 0,
}: TotalCashProps) => {
  const [animatedTotalCash, setAnimatedTotalCash] = useState(totalCash);

  useEffect(() => {
    if (totalCash > animatedTotalCash) {
      const difference = totalCash - animatedTotalCash;
      const interval = 50 / difference; // Adjust the interval based on your desired animation speed
      let current = animatedTotalCash;

      const timer = setInterval(() => {
        current += 1;
        if (current >= totalCash) {
          clearInterval(timer);
        }
        setAnimatedTotalCash(current);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [totalCash, animatedTotalCash]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Cash</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold text-green-600">
        <p>${animatedTotalCash.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalCashAccountCount} account
          {totalCashAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalCash;
