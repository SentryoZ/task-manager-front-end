"use client";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/http";
import DataTable from "@/app/projects/data-table";
import { Input } from "@/components/ui/input";
import { ProjectModel } from "@/model/projectModel";
import { useUser } from "@/useContext/UserContext";
import NoPermissionPage from "../nopermission";

interface Project {
  id: number;
  name: string;
  description: string;
  short_description: string;
  status: number;
  visibility: number;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("");
  const { hasPolicy } = useUser();

  const fetchProject = async () => {
    try {
      const response = await ProjectModel.get();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!hasPolicy("project.read")) {
    return <NoPermissionPage />;
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Input
          placeholder="Filter projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // update filter state on input change, data table will re-render with new filter value
          className="max-w-xs"
        />
      </div>
      <div className="flex-grow overflow-auto">
        <DataTable data={projects} filter={filter} fetchData={fetchProject} />
      </div>
    </div>
  );
}; // fetchProject is passed as a prop to data-table

export default ProjectsPage;
