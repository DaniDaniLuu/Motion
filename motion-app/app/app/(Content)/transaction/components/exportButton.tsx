import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useState } from "react";

type exportButtonProps<TData> = {
  table: Table<TData>;
};

const exportButton = <TData,>({ table }: exportButtonProps<TData>) => {
  const exportFullCSV = () => {
    let csvFullContent = "data:text/csv;charset=utf-8,";
    table.getPrePaginationRowModel().rows.forEach((row) => {
      if (row._valuesCache) {
        row._valuesCache.forEach((value) => {
          csvContent += `"${value}",`;
        });
      }
    });
  };

  const exportPaginatedCSV = () => {
    let csvPagContent = "data:text/csv;charset=utf-8,";
    table.getRowModel().rows.forEach((row) => {
      console.log(row);
    });
  };

  return (
    <Button size="sm" variant="ghost" className="gap-2">
      <Download></Download>Export
    </Button>
  );
};

export default exportButton;
