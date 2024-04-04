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
import { Key, ReactNode, useCallback, useState } from "react";
import {
  useTellerConnect,
  TellerConnectOnSuccess,
  TellerConnectOnEvent,
  TellerConnectOnExit,
  TellerConnectOptions,
} from "teller-connect-react";
import RefreshButton from "../../components/refreshBankAccounts";

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

  const applicationId = "app_ot3k8hmnk53vro77aq000";
  const onSuccess = useCallback<TellerConnectOnSuccess>((authorization) => {
    // send public_token to your server
    // https://teller.io/docs/api/tokens/#token-exchange-flow
    const accessToken = authorization.accessToken;
    fetch("https://api.teller.io/accounts", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa("test_token_ky6igyqi3qxa4"),
      },
    })
      .then((response) => console.log(response))
      .catch();
  }, []);
  const onEvent = useCallback<TellerConnectOnEvent>((name, data) => {
    console.log(name, data);
  }, []);
  const onExit = useCallback<TellerConnectOnExit>(() => {
    console.log("TellerConnect was dismissed by user");
  }, []);

  const config: TellerConnectOptions = {
    applicationId,
    onSuccess,
    onEvent,
    onExit,
  };

  const { open, ready } = useTellerConnect(config);

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
