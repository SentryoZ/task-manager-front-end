"use client";
import React from "react";
import Link from "next/link";
import { SidebarItems } from "../sidebaritem/SidebarItem";
import { usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";
import { useUser } from "@/useContext/UserContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = usePathname();
  const { hasPolicy } = useUser();

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

  const renderSidebarItem = (item, index) => {
    const hasPolicies =
      !item.policies ||
      item.policies.length === 0 ||
      item.policies.some((policy) => hasPolicy(policy));

    if (!hasPolicies) {
      return null;
    }

    if (item.title === "Team Manage") {
      return (
        <div key={index} className={`my-2 ${isSidebarOpen ? "px-2" : "px-1"}`}>
          {isSidebarOpen ? (
            <div className="text-xs font-semibold text-gray-400 uppercase">
              {item.title}
            </div>
          ) : (
            <div className="border-t border-gray-300 dark:border-gray-600"></div>
          )}
        </div>
      );
    }

    return (
      <Link href={item.href} key={index}>
        <div
          className={`flex items-center mb-0.5 ${
            isSidebarOpen ? "space-x-3" : "w-[40px] h-[40px]"
          } p-2 rounded-lg cursor-pointer 
            hover:bg-gray-200 transition-all duration-300 ease-in-out dark:hover:bg-gray-600
            ${item.href === path ? "bg-gray-200 dark:bg-gray-600" : ""}`}
        >
          <div className="flex items-center justify-center overflow-hidden">
            {item.icon}
          </div>
          {isSidebarOpen && (
            <div className="text-xs md:text-sm">{item.title}</div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div
      className={`h-screen flex-col fixed border-r md:flex dark:text-white p-4 transition ease-in-out ${
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
        {SidebarItems.map((item, index) => renderSidebarItem(item, index))}
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
