"use client";
import React from "react";
import Link from "next/link";
import { SidebarItems } from "../sidebaritem/SidebarItem";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="md:w-60 bg-white h-screen flex-1 flex-col fixed border-r border-zinc-200 hidden md:flex p-4">
      <h2 className="text-sm md:text-xl font-bold mb-8">Company Name</h2>
      <div>
        {SidebarItems.map((item, index) =>
          item.href ? (
            <Link href={item.href} key={index}>
              <div
                className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer`}
              >
                {item.icon}
                <p className="text-xs md:text-sm">{item.title}</p>
              </div>
            </Link>
          ) : (
            <div
              key={index}
              className={`flex items-center space-x-4 p-2 rounded-lg ${
                item.icon
                  ? "hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                  : ""
              }`}
            >
              {item.icon}
              <p className="text-xs md:text-sm">{item.title}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
