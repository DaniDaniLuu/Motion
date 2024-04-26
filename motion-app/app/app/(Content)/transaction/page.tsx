import { Button } from "@/components/ui/button";
import { ComboBox } from "./components/combobox";
import DatePicker from "./components/datepicker";
import { Download } from "lucide-react";

const Transaction = () => {
  return (
    <div className="flex flex-col font-bold text-xl">
      Transaction History
      <div className="pt-5 flex gap-1 font-medium text-sm">
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
    </div>
  );
};

export default Transaction;
