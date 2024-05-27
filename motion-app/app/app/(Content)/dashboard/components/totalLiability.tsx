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

interface TotalLiabilityProps {
  totalLiability: number;
  totalLiabilityAccountCount: number;
}

const TotalLiability = ({
  totalLiability,
  totalLiabilityAccountCount = 0,
}: TotalLiabilityProps) => {
  const [animatedTotalLiability, setAnimatedTotalLiability] =
    useState(totalLiability);

  useEffect(() => {
    if (totalLiability > animatedTotalLiability) {
      const difference = totalLiability - animatedTotalLiability;
      const interval = 1000 / difference; // Adjust the interval based on your desired animation speed
      let current = animatedTotalLiability;

      const timer = setInterval(() => {
        current += 1;
        if (current >= totalLiability) {
          clearInterval(timer);
        }
        setAnimatedTotalLiability(current);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [totalLiability, animatedTotalLiability]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Liability</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg font-bold text-red-600">
        <p>${animatedTotalLiability}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          From {totalLiabilityAccountCount} account
          {totalLiabilityAccountCount !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TotalLiability;
