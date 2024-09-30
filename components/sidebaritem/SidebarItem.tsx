"use client";
import React from "react";
import { FiHome, FiLogOut, FiUsers } from "react-icons/fi";
import {
  MdOutlineTableChart,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export type SidebarItem = {
  title: string;
  href: string;
  icon: JSX.Element | null;
  policies?: string[]; // 'policies' is now an optional property
};

export const SidebarItems = [
  {
    title: "Home",
    href: "/homepage",
    icon: <FiHome size={24} />,
    policies: [],
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <MdOutlineTableChart size={24} />,
    policies: ["project.read"],
  },
  {
    title: "Issues",
    href: "/issues",
    icon: <MdOutlineFormatListNumbered size={24} />,
  },
  {
    title: "Setting",
    href: "/settings",
    icon: <IoSettingsOutline size={24} />,
  },
  {
    title: "Team Manage",
    href: "",
    icon: null,
  },
  {
    title: "Members",
    href: "/members",
    icon: <FiUsers size={24} />,
    policies: ["user.read"],
  },
  {
    title: "Groups",
    href: "/groups",
    icon: <FaUserGroup size={24} />,
    policies: ["role.read"],
  },
  {
    title: "Your Profile",
    href: "/profile",
    icon: <CgProfile size={24} />,
  },
];
