"use client";
import React from "react";
import Link from "next/link";
import { SidebarItems } from "../sidebaritem/SidebarItem";
import { usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div
      className={`h-screen flex-col fixed border-r  md:flex dark:text-white p-4 transition-all ease-in-out ${
        isSidebarOpen ? "w-[240px]" : "w-15"
      }`}
    >
      {isSidebarOpen ? (
        <h2 className="text-sm md:text-xl font-bold">Company Name</h2>
      ) : (
        <img
          alt="Logo"
          className="w-10 h-10 border-2 rounded-md border-gray-100 dark:border-gray-600"
        />
      )}

      <div className="mt-8">
        {SidebarItems.map((item, index) => {
          const isTeamManage = item.title === "Team Manage";
          return (
            <Link href={item.href} key={index}>
              <div
                className={`flex items-center mb-0.5 ${
                  isSidebarOpen ? "space-x-3" : "w-[40px] h-[40px]"
                } p-2 rounded-lg ${
                  isTeamManage ? "space-x-0 cursor-default" : " cursor-pointer"
                } ${
                  !isTeamManage
                    ? "hover:bg-gray-200 transition-all duration-300 ease-in-out dark:hover:bg-gray-600"
                    : ""
                } ${item.href === path ? "bg-gray-200 dark:bg-gray-600" : ""}`}
              >
                {!isSidebarOpen && isTeamManage ? (
                  <hr className="border-gray-200 dark:border-gray-600 w-full" />
                ) : (
                  <>
                    <div className="flex items-center justify-center overflow-hidden">
                      {item.icon}
                    </div>
                    {isSidebarOpen && (
                      <div className="text-xs md:text-sm">{item.title}</div>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="absolute right-0 -mr-4"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <button
          className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full shadow hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer dark:hover:bg-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FiChevronLeft
              className="text-xl dark:hover:text-white"
              size={20}
            />
          ) : (
            <FiChevronRight
              className="text-xl dark:hover:text-white"
              size={20}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
