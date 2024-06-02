"use client";
import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";
import {
  MdOutlineTableChart,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

export const SidebarItems = [
  {
    title: "Home",
    path: "/",
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
    path: "/settings",
    icon: <IoSettingsOutline size={24} />,
  },
  {
    title: "Team Manage",
    path: "",
    icon: null,
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
