"use client";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ReturnButton = () => {
  const router = useRouter();
  return (
    <div className="content-area">
      {/* Your Settings page content here */}

      {/* Button with ShadowCDN styling (replace with actual ShadowCDN URL) */}

      <Button
        variant="outline" // Choose a supported variant
        onClick={() => {
          router.back();
        }}
        className="shadowcdn-styled-button"
      >
        Return
      </Button>
    </div>
  );
};

export default ReturnButton;
