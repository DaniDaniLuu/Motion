"use client";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, SquareUserRound, Landmark, CirclePlus } from "lucide-react";
import AccountTab from "./accountTab";
import { ReactNode, useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import {

  addAccountInfo,
  addToDB,
  getInfoAccountTab,
  updateTransactions,
} from "@/lib/actions";


import {
  Home,
  SquareUserRound,
  Landmark,
  CirclePlus,
  LucideIcon,
} from "lucide-react";
import AccountTab from "./navBarTab";
import { Key, ReactNode, useCallback, useState } from "react";
import {
  useTellerConnect,
  TellerConnectOnSuccess,
  TellerConnectOnEvent,
  TellerConnectOnExit,
  TellerConnectOptions,
} from "teller-connect-react";
import RefreshButton from "../../components/refreshBankAccounts";

interface AccountInfo {
  bankName: string;
  bankImage: string;
  miscInfo: string;
  balance: number;
}

const SideNavBar = () => {
  const [selected, setSelected] = useState<number>(1);
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [token, setToken] = useState(null);

  const addAccountTab = (
    bank: string,
    image: string,
    misc: string,
    bal: number
  ) => {
    const newAccountList = [
      ...accounts,
      { bankName: bank, bankImage: image, miscInfo: misc, balance: bal },
    ];
    setAccounts(newAccountList);
  };

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken: string) => {
    const response = await fetch("/api/plaid/exchange-public-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    });

    const { access_token, item_id, error } = await response.json();
    console.log(access_token, item_id, error);
    await addToDB({ plaidAccessToken: access_token });

    await addAccountInfo(access_token);
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

  return (
    <div className="flex flex-col max-w-72">
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
<div className="flex flex-col py-1">
        <div>
          <Button
            onClick={() => open()}
            variant="ghost"
            className="flex items-center gap-3"
          >
            <CirclePlus />
            <p>Add Account</p>
          </Button>
        </div>
        <RefreshButton></RefreshButton>
      </div>
      <Button onClick={() => updateTransactions()}>Test</Button>

      <ScrollArea className="flex-grow max-h-[calc(100vh-350px)] rounded-md border p-4">
        {accounts.map((accountTab) => {
          return (
            <AccountTab
              bankName={accountTab.bankName}
              bankImage={accountTab.bankImage}
              miscInfo={accountTab.miscInfo}
              balance={accountTab.balance}
            ></AccountTab>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default SideNavBar;
