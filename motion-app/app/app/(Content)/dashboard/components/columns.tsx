"use client";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

interface TransactionInfo {
  transactionId: string;
  accountId: string;
  amount: number;
  category: Array<string>;
  merchantName: string | null;
  merchantLogo: string | null;
  date: string;
  cursor: string;
}

const formSchema = z.object({
  date: z.string(),
  amount: z.number(),
  merchantName: z.string(),
});

export type FormType = z.infer<typeof formSchema>;

export const columns: ColumnDef<FormType>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "merchantName",
    header: "Merchant",
  },
];
