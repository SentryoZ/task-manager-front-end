import React from "react";
import { SidebarItem } from "../sidebaritem/SidebarItem";
import { FiHome, FiUsers, FiUserPlus } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-[64px] sm:w-[80px] md:w-[200px] lg:w-[256px] border-r fixed h-screen bg-white p-4 transition-all duration-300 ease-in-out">
      <h2 className="text-sm md:text-xl font-bold mb-8">Company Name</h2>
      <div>
        {SidebarItem.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-4 p-2 rounded-lg ${
              item.icon
                ? "hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                : ""
            }`}
          >
            {item.icon}
            <p
              className={`text-xs md:text-sm ${
                item.title === "Team Manage" ? " cursor-pointer" : ""
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
