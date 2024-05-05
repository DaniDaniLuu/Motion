import React, { FC } from "react";
import SideNavBar from "./components/sidebar/sideNavBar";

const AppLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex py-5 px-2">
      <SideNavBar />
      <div className="px-5">{children}</div>
    </div>
  );
};

export default AppLayout;