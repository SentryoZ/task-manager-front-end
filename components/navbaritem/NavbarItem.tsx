import React from "react";
import { FiCalendar, FiBell } from "react-icons/fi";

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
];
