"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CirclePlus } from "lucide-react";
import { useCallback, useState, useEffect, memo } from "react";
import { usePlaidLink } from "react-plaid-link";
import {
  addAccountInfo,
  addToDB,
  fetchStoredBankInfo,
} from "@/lib/actions";
import AccountTab from "./accountTab";
import RefreshButton from "../refresh/refreshBankAccounts";
import { useBankAccountContext } from "@/components/context/BankAccountContextProvider";
import ButtonList from "./ButtonList";
import { BankAccountInfo } from "@/lib/types";

const SideNavBar = () => {
  console.log("SideNavBar gets rendered");
  const [token, setToken] = useState(null);
  const { bankAccounts, setBankAccounts } = useBankAccountContext();

  const createLinkToken = async () => {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
      cache: "no-store",
    });

    if (response.ok) {
      const { link_token } = await response.json();
      setToken(link_token);
    } else {
      const errorResponse = await response.json();
      console.log("Link token creation error:", errorResponse);
    }
  };

  useEffect(() => {
    const fetchedBankInfo = async () => {
      const fetchedBankInfo = await fetchStoredBankInfo();
      if (fetchedBankInfo) {
        setBankAccounts([...fetchedBankInfo]);
      }
    };

    createLinkToken();
    fetchedBankInfo();
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
    const fetchedBankInfo = await fetchStoredBankInfo();
    if (fetchedBankInfo) {
      setBankAccounts([...fetchedBankInfo]);
      createLinkToken();
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <div className="flex flex-col pl-4 pr-2 bg-primary">
      <div className="text-secondary text-center text-2xl font-extrabold pt-2 pb-1">
        Motion
      </div>
      <ButtonList></ButtonList>

      <div className="flex flex-col py-2">
        <div>
          <Button
            onClick={() => open()}
            variant="ghost"
            className="flex items-center gap-3 text-secondary"
            disabled={!ready}
          >
            <CirclePlus />
            <p>Add Account</p>
          </Button>
        </div>
        <RefreshButton disabled={!ready}></RefreshButton>
      </div>

      <ScrollArea className="max-h-[calc(50vh)] rounded-md border p-4 bg-primary">
        <div className="flex flex-col gap-4 bg-primary">
          {bankAccounts.map((account: BankAccountInfo) => {
            return (
              <AccountTab
                key={account.accountId}
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
