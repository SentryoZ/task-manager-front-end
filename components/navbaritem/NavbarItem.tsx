import React from "react";
import { FiCalendar, FiBell, FiPlus, FiMoreHorizontal } from "react-icons/fi";

export const NavbarItem = [
  {
    title: "",
    href: "/calendar",
    icon: <FiCalendar size={24} />,
    buttonStyle: true,
  },
  {
    title: "",
    href: "/notifications",
    icon: <FiBell size={24} />,
    buttonStyle: true,
  },
  {
    title: "New Project",
    href: "/newproject",
    buttonStyle: true,
  },
];
