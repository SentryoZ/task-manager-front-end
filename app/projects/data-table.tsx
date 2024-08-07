import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DropDownButton from "@/components/dropdown/dropdown";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
  data: TData[];
  filter: string;
  fetchData: () => void; // fetch data function
}

export default function DataTable<TData>({
  data,
  filter,
  fetchData,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  useEffect(() => {
    // only use it when filter changes otherwise it will cause "Too many re-renders"
    setColumnFilters([{ id: "name-description", value: filter }]);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // reset on search
  }, [filter]);

  const columns: ColumnDef<any>[] = [
    {
      accessorFn: (row) => `${row.name}\n${row.description}`, // combine name and description for filtering
      id: "name-description", // id for filtering
      header: "Project Details",
      // render name and description in separate lines
      cell: (info) => (
        <div>
          <div className="font-medium">{info.row.original.name}</div>
          <div className="text-sm">{info.row.original.description}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: (info) => (
        <div className="text-right pr-4">
          <DropDownButton
            type="project"
            id={info.row.original.id}
            fetchData={fetchData}
          />
        </div>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 5, // page size
  });

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow overflow-auto p-4">
        <Table className="h-full">
          <TableBody className="border-b">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell className="text-center" colSpan={100}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-10">
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
