"use client";
import React from "react";
import { DataTable } from "./data-table";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/http";
import { Input } from "@/components/ui/input";

import AddMember from "@/components/addmember/addmember";

interface User {
  avatar: string;
  id: number;
  name: string;
  email: string | null; // 'email' can be null
  status: number;
  role: number;
  created_at: string;
  updated_at: string;
}

const MembersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");

  const fetchMembers = async () => {
    try {
      const response = await axiosInstance.get("api/user");
      if (response.data) {
        setUsers(response.data.data);
      } else {
        throw new Error("Failed to fetch members.");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);


  return (
    <div className="flex flex-col h-full w-full p-4 space-y-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex space-x-1">
          <Input
            placeholder="Filter member..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // update filter state on input change, data table will re-render with new filter value
            className="max-w-xs"
          />
          <AddMember />
        </div>
      </div>

      <DataTable  filter={filter} data={users} fetchData={fetchMembers}/>
    </div>
  );
};

export default MembersPage;
