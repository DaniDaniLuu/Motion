import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import styles from "./refreshBankAccounts.module.css";

const RefreshButton = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleSpin = () => setIsSpinning(!isSpinning);

  return (
    <div>
      <Button
        variant={"ghost"}
        className="flex items-center gap-3"
        onClick={toggleSpin}
      >
        <RefreshCcw className={isSpinning ? styles.spin : ""}></RefreshCcw>
        Refresh Accounts
      </Button>
    </div>
  );
};
export default RefreshButton;
