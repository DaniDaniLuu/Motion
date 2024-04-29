import { Button } from "@/components/ui/button";
import { ComboBox } from "./components/combobox";
import DatePicker from "./components/datepicker";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FormType, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<FormType[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ];
}

const Transaction = async () => {
  const data = await getData();

  return (
    <div className="flex flex-col font-bold text-xl">
      Transaction History
      <div className="py-5 flex gap-1 font-medium text-sm">
        <div className="flex flex-col">
          <p>From</p>
          <DatePicker></DatePicker>
        </div>
        <div className="flex flex-col">
          <p>To</p>
          <DatePicker></DatePicker>
        </div>
        <div className="flex flex-col">
          <p>Type</p>
          <ComboBox></ComboBox>
        </div>
        <div className="flex flex-col">
          <p>Bank</p>
          <ComboBox></ComboBox>
        </div>
        <div className="flex flex-col justify-end">
          <Button size="default" className="h-7">
            Apply
          </Button>
        </div>
        <div className="flex flex-col justify-end">
          <Button size="sm" variant="ghost" className="gap-2">
            <Download></Download>Export
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Transaction;
