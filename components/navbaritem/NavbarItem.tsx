import React from "react";
import { FiCalendar, FiBell, FiPlus, FiMoreHorizontal } from "react-icons/fi";

export const NavbarItem = [
  {
    title: "",
    path: "/calendar",
    icon: <FiCalendar size={24} />,
    buttonStyle: true,
  },
  {
    title: "",
    path: "/notifications",
    icon: <FiBell size={24} />,
    buttonStyle: true,
  },
  {
    title: "New Project",
    path: "/new-project",
    icon: <FiPlus size={24} />,
    buttonStyle: true,
  },
];
