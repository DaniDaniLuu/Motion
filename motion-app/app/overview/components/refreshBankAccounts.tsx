"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import styles from "./refreshBankAccounts.module.css";
import { useToast } from "@/components/ui/use-toast";
import { updateTransactions } from "@/lib/actions";

const RefreshButton = ({ disabled }: { disabled: boolean }) => {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleSpin = () => setIsSpinning((prevState) => !prevState);

  return (
    <div>
      <Button
        variant={"ghost"}
        className="flex items-center gap-3"
        disabled={isSpinning || disabled}
        onClick={async () => {
          toggleSpin();
          const response = await updateTransactions([]);
          if (response == "Added new transactions!") {
            toast({
              description: response,
              className: "bg-primary font-bold",
            });
          } else {
            toast({
              description: response,
              variant: "destructive",
              className: "font-bold",
            });
          }

          toggleSpin();
        }}
      >
        <RefreshCcw className={isSpinning ? styles.spin : ""}></RefreshCcw>
        Refresh Accounts
      </Button>
    </div>
  );
};
export default RefreshButton;
