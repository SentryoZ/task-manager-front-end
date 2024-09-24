"use client";
import React from "react";
import { DataTable } from "./data-table";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/http";
import { Input } from "@/components/ui/input";

import AddMember from "@/components/addmember/addmember";
import { UserModel } from "@/model/userModel";
import { useUser } from "@/useContext/UserContext";
import NoPermissionPage from "../nopermission";

interface User {
  avatar: string;
  id: number;
  name: string;
  email: string;
  status: number;
  role: number;
  created_at: string;
  updated_at: string;
  status_label: string;
  role_name: string;
}

const MembersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const { user, hasPolicy } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const canAddMember = hasPolicy("user.create");

  if (!hasPolicy("user.read")) {
    return <NoPermissionPage />;
  }

  const fetchMembers = async () => {
    try {
      const response = await UserModel.get();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100000); // Set loading time to 1 second
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex space-x-1">
          <Input
            placeholder="Filter member..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // update filter state on input change, data table will re-render with new filter value
            className="max-w-xs"
          />
          {canAddMember && <AddMember />}
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <DataTable
          filter={filter}
          data={users}
          fetchData={fetchMembers}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MembersPage;
