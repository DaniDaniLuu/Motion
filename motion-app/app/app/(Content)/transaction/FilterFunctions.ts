import { Row } from "@tanstack/react-table";
import { format } from "date-fns";

export const isWithinRange = <TData>(row: Row<TData>, columnId: string, value: [Date, Date]) => {
  const [startDate, endDate] = value;
  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");
  const itemDate = row.getValue(columnId) as string;
  return itemDate >= formattedStartDate && itemDate <= formattedEndDate;
};
