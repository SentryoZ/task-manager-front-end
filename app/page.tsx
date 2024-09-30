import { Nav } from "@/components/nav/page";
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-screen bg-background flex flex-col items-center p-4 ">
      <Nav />
      <main className="flex-grow">{/* Your main content goes here */}</main>
      <footer className="flex justify-center items-center w-full bg-background border-t dark:border-zinc-900">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Task.manager
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
