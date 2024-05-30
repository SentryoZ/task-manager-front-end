import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow sm:ml-[64px] md:ml-[200px] lg:ml-[256px] w-full transition-all duration-300 ease-in-out">
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;
