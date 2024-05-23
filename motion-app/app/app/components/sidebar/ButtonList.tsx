"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Home, SquareUserRound, Landmark } from "lucide-react";
import { ReactNode } from "react";
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
      title: "Account",
      icon: <SquareUserRound />,
      content: "Account Overview",
    },
    {
      id: 3,
      title: "Transaction",
      icon: <Landmark />,
      content: "Transaction List",
    },
  ];

  return (
    <div className="border-b border-primary-foreground pb-4">
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
                    className={`flex justify-start ${
                      pathname.includes(button.title.toLowerCase())
                        ? "bg-secondary"
                        : ""
                    }`}
                    variant="ghost"
                    onClick={() => {
                      if (button.id == 1) {
                        router.push("/app/dashboard");
                      } else if (button.id == 2) {
                        router.push("/app/account");
                      } else {
                        router.push("/app/transaction");
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

export default ButtonList;
