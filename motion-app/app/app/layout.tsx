import React, { FC } from "react";
import SideNavBar from "./components/sidebar/sideNavBar";
import { BankAccountContextProvider } from "@/components/context/BankAccountContextProvider";


type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex py-5 px-2">
      <BankAccountContextProvider>
        <SideNavBar />
        <div className="px-5">{children}</div>
      </BankAccountContextProvider>
    </div>
  );
};

export default AppLayout;
