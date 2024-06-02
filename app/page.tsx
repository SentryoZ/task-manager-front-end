"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Routes, Route } from "react-router-dom";
import IssuesPage from "./homepage/issues/page";
import GroupsPage from "./homepage/groups/page";
import SettingsPage from "./homepage/settings/page";
import MembersPage from "./homepage/members/page";
import ProjectsPage from "./homepage/projects/page";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

const BrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow sm:ml-[64px] md:ml-[200px] lg:ml-[256px] w-full transition-all duration-300 ease-in-out">
          <Navbar />
        </div>
      </div>
      <div className="flex-grow sm:ml-[64px] md:ml-[200px] lg:ml-[256px] h-full w-full transition-all duration-300 ease-in-out pt-[24px] pl-[24px]">
        <Routes>
          <Route path="/" element={<h1>Hi</h1>} />
          <Route path="issues" element={<IssuesPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
