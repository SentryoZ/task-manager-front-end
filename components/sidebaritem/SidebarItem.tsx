import React from "react";
import { FiHome } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { MdOutlineTableChart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { group } from "console";

export const SidebarItem = [
  {
    title: "Home",
    path: "/homepage",
    icon: <FiHome size={24} />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <MdOutlineTableChart size={24} />,
  },
  {
    title: "Issues",
    path: "/issues",
    icon: <MdOutlineFormatListNumbered size={24} />,
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <IoSettingsOutline size={24} />,
  },
  {
    title: "Team Manage",
    path: "",
    icon: "",
  },
  {
    title: "Members",
    path: "/members",
    icon: <FiUsers size={24} />,
  },
  {
    title: "Groups",
    path: "/groups",
    icon: <FaUserGroup size={24} />,
  },
];
