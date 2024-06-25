"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Home, Layers, CreditCard, CandlestickChart } from "lucide-react";
import { ReactNode, memo } from "react";
import { usePathname, useRouter } from "next/navigation";


const ButtonList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const buttonList = [
    {
      id: 1,
      title: "Dashboard",
      icon: <Home></Home>,
      content: "Financial Homepage",
    },
    {
      id: 2,
      title: "Accounts",
      icon: <Layers />,
      content: "Accounts Overview",
    },
    {
      id: 3,
      title: "Transaction",
      icon: <CreditCard />,
      content: "Transaction List",
    },
    {
      id: 4,
      title: "Investments",
      icon: <CandlestickChart />,
      content: "Investments",
    },
  ];

  return (
    <div className="border-b border-primary-foreground">
      <TooltipProvider>
        {buttonList.map(
          (button: {
            id: number;
            title: string;
            icon: ReactNode;
            content: string;
          }) => {
            return (
              <Tooltip key={button.id}>
                <TooltipTrigger asChild className="gap-2 min-w-72">
                  <Button
                    className={`flex justify-start my-2 text-secondary ${
                      pathname.includes(button.title.toLowerCase())
                        ? "bg-secondary text-primary"
                        : ""
                    }`}
                    variant="ghost"
                    onClick={() => {
                      if (button.id == 1) {
                        router.push("/app/dashboard");
                      } else if (button.id == 2) {
                        router.push("/app/account");
                      } else if (button.id == 3) {
                        router.push("/app/transaction");
                      } else {
                        router.push("/app/investments");
                      }
                      router.refresh();
                    }}
                  >
                    {button.icon}
                    {button.title}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.content}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
        )}
      </TooltipProvider>
    </div>
  );
};

export default memo(ButtonList);
