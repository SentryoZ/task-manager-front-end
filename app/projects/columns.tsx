import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import DropDownButton from "@/components/dropdown/dropdown";

export const getColumns = (
  fetchData: () => void,
  canUpdate: boolean,
  canDelete: boolean
): ColumnDef<any>[] => [
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
      <div className="text-right pr-24">
        {(canUpdate || canDelete) && (
          <DropDownButton
            type="project"
            id={info.row.original.id}
            fetchData={fetchData}
          />
        )}
      </div>
    ),
  },
];
