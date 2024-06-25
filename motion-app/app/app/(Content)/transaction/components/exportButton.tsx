import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type exportButtonProps<TData> = {
  table: Table<TData>;
};

const exportButton = <TData,>({ table }: exportButtonProps<TData>) => {
  const exportFullCSV = () => {
    let csvFullContent = "data:text/csv;charset=utf-8,";
    table.getSortedRowModel().rows.forEach((row) => {
      const rowDate = row.getValue("date");
      const rowDescription = row.getValue("description");
      const rowType = row.getValue("type");
      const rowAmount = row.getValue("amount");

      csvFullContent += `${rowDate},${rowDescription},${rowType},${rowAmount}\n`;
    });

    let encodedURI = encodeURI(csvFullContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPaginatedCSV = () => {
    let csvPagContent = "data:text/csv;charset=utf-8,";
    table.getRowModel().rows.forEach((row) => {
      const rowDate = row.getValue("date");
      const rowDescription = row.getValue("description");
      const rowType = row.getValue("type");
      const rowAmount = row.getValue("amount");

      csvPagContent += `${rowDate},${rowDescription},${rowType},${rowAmount}\n`;
    });

    let encodedURI = encodeURI(csvPagContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Sheet>
      <SheetTrigger className="flex gap-1 items-center">
        <Download></Download>Export
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>CSV Export Options</SheetTitle>
          <SheetDescription>
            Below choose whether you want to export the full or current
            displayed data
          </SheetDescription>
        </SheetHeader>
        <div className="flex justify-between mt-4">
          <Button onClick={exportFullCSV}>Full CSV</Button>
          <Button onClick={exportPaginatedCSV}>Current CSV</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default exportButton;
