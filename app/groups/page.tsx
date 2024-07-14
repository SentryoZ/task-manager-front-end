"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import AddRole from "./addrole";
import { RoleModel } from "@/model/roleModel";
import { useEffect } from "react";
import { getColumns } from "./columns";

interface RoleManagement {
    id: string;
    name: string;
    policies: string[];
    description: string;
}

const GroupsPage = () => {
    const [data, setData] = useState<RoleManagement[]>([]);

    const fetchRoles = async () => {
        try {
            const response = await RoleModel.get()
            setData(response.data)
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    const columns = getColumns(fetchRoles);

  return (
    <div className="flex flex-col h-full w-full p-4 space-y-2">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Role Management</h1>
                <div className="flex space-x-1 ">
                    <Input
                        placeholder="Filter member..."
                        className="max-w-xs"
                    />
                <AddRole/>
                </div>
            </div>

          <DataTable columns={columns} data={data} fetchData={fetchRoles}/>
        </div>
  );
};

export default GroupsPage;
