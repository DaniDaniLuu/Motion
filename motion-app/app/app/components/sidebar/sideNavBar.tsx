"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CirclePlus } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
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
import { useRefreshContext } from "@/components/context/RefreshContextProvider";
import ButtonList from "./ButtonList";

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
  const [token, setToken] = useState(null);
  const [currentBankAccounts, setCurrentBankAccounts] = useState<
    BankAccountInfo[]
  >([]);
  const { triggerRefresh, setTriggerRefresh } = useRefreshContext();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create-link-token", {
        method: "POST",
        cache: "no-store",
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

  // useEffect(() => {
  //   setCurrentBankAccounts(currentBankAccounts);
  // }, [currentBankAccounts]);

  const onSuccess = useCallback(async (publicToken: string) => {
    console.log("onSuccess Runs!");
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
      setTriggerRefresh(triggerRefresh + 1);
      setCurrentBankAccounts([...fetchedBankInfo]);
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <div className="flex flex-col">
      <ButtonList></ButtonList>
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
