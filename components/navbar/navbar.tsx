import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { NavbarItem } from "../navbaritem/NavbarItem";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-white text-black w-full max-h-[66px]  border-b ">
      <div className="relative w-full max-w-sm items-center space-x-2 hidden sm:inline-flex">
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-0.75"
        />
        <CiSearch className="absolute right-2 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-center ">
        {NavbarItem.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-lg mr-3  ${
              item.buttonStyle
                ? " hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                : ""
            }`}
          >
            {item.icon}
            <p
              className={`text-xs md:text-sm ${
                item.title === "New Project" ? " cursor-pointer" : ""
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
