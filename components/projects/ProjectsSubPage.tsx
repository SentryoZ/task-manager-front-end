"use client";
import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../searchbar/searchbar";
import {
  axiosInstance,
  sendRequest,
  sendUnauthenticatedRequest,
} from "@/lib/http";

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectsSubPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const data = {};

  axiosInstance.get("api/project").then(async (response) => {
    const result = await sendRequest("GET", "api/project", data);
    console.log(result);
    if (result || result.data) {
      setProjects(result.data);
    }
  });

  return (
    <div className="w-full h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <SearchBar />
      </div>
      <div className="flex-1 w-full border p-4 overflow-y-auto">
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 border-b">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSubPage;
