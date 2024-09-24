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
import { getColumns } from "./columns";
import { useUser } from "@/useContext/UserContext";

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

  const { hasPolicy } = useUser();

  useEffect(() => {
    // only use it when filter changes otherwise it will cause "Too many re-renders"
    setColumnFilters([{ id: "name-description", value: filter }]);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // reset on search
  }, [filter]);

  const canUpdate = hasPolicy("project.update");
  const canDelete = hasPolicy("project.delete");

  const columns = getColumns(fetchData, canUpdate, canDelete);

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
      <div className="flex flex-col flex-grow overflow-auto border rounded-xl">
        <Table className="h-full">
          <TableBody>
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
      <div className="flex items-center justify-center space-x-2 mt-5">
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
