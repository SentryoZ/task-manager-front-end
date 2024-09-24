"use client";
import React, { useContext, useState } from "react";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import AddRole from "./addrole";
import { RoleModel } from "@/model/roleModel";
import { useEffect } from "react";
import { getColumns } from "./columns";
import { useUser } from "@/useContext/UserContext";
import NoPermissionPage from "../nopermission";
interface RoleManagement {
  id: string;
  name: string;
  policies: string[];
  description: string;
}

const GroupsPage = () => {
  const [data, setData] = useState<RoleManagement[]>([]);
  const { hasPolicy } = useUser();
  const canAddRole = hasPolicy("role.create");

  const fetchRoles = async () => {
    try {
      const response = await RoleModel.get();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  if (!hasPolicy("role.read")) {
    return <NoPermissionPage />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <div className="flex space-x-2">
          <Input placeholder="Filter member..." className="max-w-xs" />
          {canAddRole && <AddRole />}
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <DataTable data={data} fetchData={fetchRoles} />
      </div>
    </div>
  );
};

export default GroupsPage;
