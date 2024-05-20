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
import { ReactNode, useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import {
  addAccountInfo,
  addToDB,
  getInfoAccountTab,
  updateTransactions,
  fetchStoredBankInfo,
} from "@/lib/actions";
import AccountTab from "./accountTab";

import RefreshButton from "../refresh/refreshBankAccounts";
import { usePathname, useRouter } from "next/navigation";
import { useRefreshContext } from "@/components/context/RefreshContextProvider";

interface BankAccountInfo {
  accountId: string;
  balance: number;
  accountType: string;
  bankName: string;
  persistentAccountId?: string;
  accessToken: string;
  icon: string | null;
}

const SideNavBar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [currentBankAccounts, setCurrentBankAccounts] = useState<
    BankAccountInfo[]
  >([]);
  const pathname = usePathname();
  const {isRefreshing, setIsRefreshing} = useRefreshContext()

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    const fetchedBankInfo = async () => {
      const fetchedBankInfo = await fetchStoredBankInfo();
      if (fetchedBankInfo) {
        setCurrentBankAccounts([...fetchedBankInfo]);
      }
    };
    createLinkToken();
    fetchedBankInfo();
  }, []);

  useEffect(() => {
    setCurrentBankAccounts(currentBankAccounts);
  }, [currentBankAccounts]);

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
    const fetchedBankInfo = await fetchStoredBankInfo();
    if (fetchedBankInfo) {
      setIsRefreshing(true)
      setCurrentBankAccounts([...fetchedBankInfo]);
    }
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
    <div className="flex flex-col">
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
      <div className="flex flex-col py-1">
        <div>
          <Button
            onClick={() => open()}
            variant="ghost"
            className="flex items-center gap-3 "
            disabled={!ready}
          >
            <CirclePlus />
            <p>Add Account</p>
          </Button>
        </div>
        <RefreshButton disabled={!ready}></RefreshButton>
      </div>

      <ScrollArea className=" max-h-[calc(100vh-350px)] rounded-md border p-4">
        <div className="flex flex-col gap-4">
          {currentBankAccounts.map((account: BankAccountInfo) => {
            return (
              <AccountTab
                key={account.bankName}
                bankName={account.bankName}
                bankImage={account.icon ? account.icon : ""}
                miscInfo={account.accountType}
                balance={account.balance}
              ></AccountTab>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SideNavBar;
