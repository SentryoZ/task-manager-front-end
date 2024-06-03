"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { NavbarItem } from "../navbaritem/NavbarItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="flex justify-between items-center p-5 bg-white text-black  h-[66px] border-b">
      <div className="relative md:w-[295px] items-center space-x-2 hidden md:flex">
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-0.75"
        />
        <CiSearch className="absolute right-2 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-center ">
        {NavbarItem.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`flex items-center p-2 rounded-lg mr-3  hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer border h-[42px] ${
                item.href === path ? "bg-gray-200" : ""
              }`}
            >
              {item.icon}
              <p className="text-xs md:text-sm ">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
