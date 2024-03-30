"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  SquareUserRound,
  Landmark,
  CirclePlus,
  LucideIcon,
} from "lucide-react";
import AccountTab from "./navBarTab";
import { Key, ReactNode, useState } from "react";

const SideNavBar = () => {
  const [selected, setSelected] = useState(1);
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
    <div className="flex flex-col max-w-72">
      <div className="border-b border-primary-foreground pb-4">
        <TooltipProvider>
          {buttonList.map(
            (button: {
              id: any;
              title: string;
              icon: ReactNode;
              content: string;
            }) => {
              return (
                <Tooltip>
                  <TooltipTrigger asChild className="gap-2 min-w-72">
                    <Button
                      key={button.id}
                      className={`flex justify-start ${
                        button.id === selected ? "bg-secondary" : ""
                      }`}
                      variant="ghost"
                      onClick={() => {
                        setSelected(button.id);
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
      <div className="py-4">
        <Button variant="ghost" className="flex items-center gap-3">
          <CirclePlus />
          <p>Add Account</p>
        </Button>
      </div>

      <ScrollArea className="flex-grow max-h-[600px] rounded-md border p-4">
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
        <AccountTab></AccountTab>
      </ScrollArea>
    </div>
  );
};

export default SideNavBar;
