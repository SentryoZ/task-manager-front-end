import React from "react";
import { Button } from "@/components/ui/button";
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
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { axiosInstance } from "@/lib/http";
import { useRouter } from "next/navigation";

const DropDownButton = ({ projectId, fetchData }) => {
  // take projectId as props from data-table.tsx

  const onDelete = async () => {
    try {
      console.log("Deleting project with id:", projectId);
      const response = await axiosInstance.delete(`api/project/${projectId}`); // take projectId from props
      console.log("Delete successful", response.data);
      fetchData(); // fetch data after delete
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46 dark:text-white ">
          <DropdownMenuItem>
            <span className="flex items-center justify-between w-full cursor-pointer ">
              <span>Edit</span>
              <CiEdit className="h-4 w-4" />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <span className="flex items-center justify-between w-full cursor-pointer ">
              <span>Delete</span>
              <MdOutlineDelete className="h-4 w-4" />
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownButton;
