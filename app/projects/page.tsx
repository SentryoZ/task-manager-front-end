"use client";
import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "@/components/searchbar/searchbar";
import {
  axiosInstance,
  sendRequest,
  sendUnauthenticatedRequest,
} from "@/lib/http";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("api/project");
        const data = response.data;
        console.log(data);
        if (data) {
          setProjects(data.data);
        } else {
          throw new Error("Failed to fetch projects.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col">
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
              <p>
                <b>Short Description:</b> {project.short_description}
              </p>
              <p>
                <b>Status:</b> {project.status}
              </p>
              <p>
                <b>Visibility:</b> {project.visibility}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
