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
    <div className="pb-6">
      <h1 className="text-5xl">Available Balance</h1>
      <p className="text-4xl pt-2">
        ${animatedTotalLiquidity.toLocaleString()}
      </p>
    </div>
  );
};

export default TotalLiquidity;
