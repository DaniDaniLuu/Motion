"use client";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

const formSchema = z.object({
  date: z.string(),
  description: z.number(),
  type: z.string(),
  amount: z.number(),
});

export type FormType = z.infer<typeof formSchema>;

export const columns: ColumnDef<FormType>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
