"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import DatePicker from "./components/datepicker";
import { ComboBox } from "./components/combobox";
import { Download } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      sorting: [
        {
          id: "date",
          desc: true, // sort by name in descending order by default
        },
      ],
    },
  });

  return (
    <div>
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
          <div className="flex items-center">
            <Input
              placeholder="Filter types..."
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("type")?.setFilterValue(event.target.value)
              }
              className="w-[150px] h-7"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p>Bank</p>
          <div className="flex items-center ">
            <Input
              placeholder="Filter banks..."
              value={
                (table.getColumn("bank")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("bank")
                  ?.setFilterValue(event.target.value)
              }
              className="w-[150px] h-7"
            />
          </div>
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
