"use client";
import React, { createContext, useContext, useState } from "react";
import SideNavBar from "./sidebar/sideNavBar";
import Dashboard from "./mainContent/dashboard/dashboard";
import Transaction from "./mainContent/transaction/transaction";
import Account from "./mainContent/account/account";

// Define the list of pages with their corresponding components
const PageList = [
  {
    id: 1,
    title: "Dashboard",
    component: Dashboard,
  },
  {
    id: 2,
    title: "Transaction",
    component: Transaction,
  },
  {
    id: 3,
    title: "Account",
    component: Account,
  },
];

// Create the context
const PageContext = createContext<{
  id: number;
  setPage: (pageId: number) => void;
}>({
  id: 1,
  setPage: () => {},
});

const OverviewPage = () => {
  // State to hold the current page ID
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page change
  const setPage = (pageId: number) => {
    setCurrentPage(pageId);
  };

  // Get the component for the current page
  const CurrentPageComponent = PageList.find(
    (page) => page.id === currentPage
  )?.component;

  return (
    <div className="flex p-10">
      {/* Provide the context with current page ID and setPage function */}
      <PageContext.Provider value={{ id: currentPage, setPage }}>
        <SideNavBar setPage={setPage} />
        <div className="px-5">
          {/* Render the current page component */}
          {CurrentPageComponent && <CurrentPageComponent />}
        </div>
      </PageContext.Provider>
    </div>
  );
};

export default OverviewPage;
