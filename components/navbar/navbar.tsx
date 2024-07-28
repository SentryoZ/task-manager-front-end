"use client";
import React from "react";
import Link from "next/link";
import { NavbarItem } from "../navbaritem/NavbarItem";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../themetoggle/themetoggle";
import CreateProject from "../createproject/createproject";
import UserProfile from "../profile/UserProfile";

const Navbar = () => {
  const path = usePathname();

  return (
    <nav className="flex p-5 text-black h-[66px] border-b dark:text-white ">
      <div className="flex items-center space-x-3  ml-auto">
        <div>
          <ThemeToggle />
        </div>

        {NavbarItem.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out cursor-pointer border h-[42px] dark:hover:bg-gray-600 ${
                item.href === path ? "bg-gray-200 dark:bg-gray-600" : ""
              }`}
            >
              {item.icon}
              <p className="text-xs md:text-sm ">{item.title}</p>
            </div>
          </Link>
        ))}
        <CreateProject />
        <div>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
