"use client";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

const formSchema = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.union([
    z.literal("pending"),
    z.literal("processing"),
    z.literal("success"),
    z.literal("failed"),
  ]),
  email: z.string().email(),
});

export type FormType = z.infer<typeof formSchema>;

export const columns: ColumnDef<FormType>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
