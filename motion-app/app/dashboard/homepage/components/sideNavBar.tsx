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
import { ReactNode, useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";

const SideNavBar = () => {
  const [selected, setSelected] = useState(1);
  const [token, setToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/create-link-token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken: string) => {
    const response = await fetch("/api/exchange-public-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    });

    const { access_token, item_id, error } = await response.json();
    console.log(access_token);
    setAccessToken(access_token);
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

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

  const simpleCall = async () => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });
    const data = await response.json();
    console.log(data);
  };

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
        <Button
          onClick={() => open()}
          variant="ghost"
          className="flex items-center gap-3"
          disabled={!ready}
        >
          <CirclePlus />
          <p>Add Account</p>
        </Button>
        <Button
          onClick={() => simpleCall()}
          variant="ghost"
          className="flex items-center gap-3"
        >
          <CirclePlus />
          <p>Test API Call</p>
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
