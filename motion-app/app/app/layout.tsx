import React, { FC } from "react";
import SideNavBar from "./components/sidebar/sideNavBar";
import { BankAccountContextProvider } from "@/components/context/BankAccountContextProvider";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  console.log("App Layout gets rendered");
  return (
    <div className="flex min-h-screen">
      <BankAccountContextProvider>
        <SideNavBar />
        <div className="flex flex-col bg-secondary w-full">
          {children}
        </div>
      </BankAccountContextProvider>
    </div>
  );
};

export default AppLayout;
