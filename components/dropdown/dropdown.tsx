import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { axiosInstance } from "@/lib/http";

const DropDownButton = ({ type, id, fetchData  }) => {
  const onDelete = async () => {
    try {
      const response = await axiosInstance.delete(`api/${type}/${id}`);
      console.log("Delete successful", response.data);
      fetchData();
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
