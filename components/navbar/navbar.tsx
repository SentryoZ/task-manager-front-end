import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-slate-400 text-black">
      <h1 className="text-xl font-bold">Company Name</h1>
      <div className="flex items-center space-x-2">
        <Avatar style={{ width: "40px", height: "40px" }}>
          <AvatarImage
            src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
            alt="N/A"
          />
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDownIcon className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuItem>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem >
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
