"use client";
import React from "react";
import {FiHome, FiLogOut, FiUsers} from "react-icons/fi";
import {
  MdOutlineTableChart,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";


export const SidebarItems = [
  {
    title: "Home",
    href: "/",
    icon: <FiHome size={24} />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <MdOutlineTableChart size={24} />,
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
  },
  {
    title: "Groups",
    href: "/groups",
    icon: <FaUserGroup size={24} />,
  },
  {
    title: "Your Profile",
    href: "/profile",
    icon: <CgProfile size={24} />,
  }
];
