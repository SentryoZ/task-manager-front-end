import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import DropDownButton from "@/components/dropdown/dropdown";

export interface User {
  id: number;
  name: string;
  email: string;
  status: number;
  role: number;
  avatar: string;
  status_label: string;
  role_name: string;
}

export const getColumns = (
  fetchData: () => void,
  canUpdate: any,
  canDelete: any
): ColumnDef<User>[] => [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: (info) => (
      <img
        src={info.getValue() as string}
        alt="avatar"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status_label",
    header: "Status",
  },
  {
    accessorKey: "role_name",
    header: "Role",
  },
  {
    id: "actions",
    header: "",
    cell: (info) => (
      <div className="text-right pr-4">
        {(canUpdate || canDelete) && (
          <DropDownButton
            type="user"
            id={info.row.original.id}
            fetchData={fetchData}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        )}
      </div>
    ),
  },
];
