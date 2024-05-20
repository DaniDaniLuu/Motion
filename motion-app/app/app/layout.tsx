import React, { FC } from "react";
import SideNavBar from "./components/sidebar/sideNavBar";
import { RefreshContextProvider } from "@/components/context/RefreshContextProvider";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex py-5 px-2">
      <RefreshContextProvider>
        <SideNavBar />
        <div className="px-5">{children}</div>
      </RefreshContextProvider>
    </div>
  );
};

export default AppLayout;
