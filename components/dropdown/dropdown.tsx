import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import useOnDelete from "@/hooks/useOnDelete";
import MemberEditForm from "../memberform/memberform";
import ProjectEditForm from "../projectform/projectform";
import GroupEditForm from "../groupform/groupform";
import { useUser } from "@/useContext/UserContext";

interface DropDownButtonProps {
  type: string;
  id: string | number;
  fetchData: () => void;
  canUpdate?: boolean;
  canDelete?: boolean;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  type,
  id,
  fetchData,
}) => {
  const [open, setOpen] = useState(false);
  const onDelete = useOnDelete(type, id, fetchData);
  const { hasPolicy } = useUser();

  const canUpdate = hasPolicy(`${type}.update`);
  const canDelete = hasPolicy(`${type}.delete`);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46 dark:text-white ">
          {canUpdate && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <span className="flex items-center justify-between w-full cursor-pointer ">
                <span>Edit</span>
                <CiEdit className="h-4 w-4" />
              </span>
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={onDelete}>
              <span className="flex items-center justify-between w-full cursor-pointer ">
                <span>Delete</span>
                <MdOutlineDelete className="h-4 w-4" />
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {type === "user" ? (
        <MemberEditForm
          open={open}
          setOpen={setOpen}
          fetchData={fetchData}
          type={type}
          id={id}
        />
      ) : type === "project" ? (
        <ProjectEditForm
          open={open}
          setOpen={setOpen}
          fetchData={fetchData}
          type={type}
          id={id}
        />
      ) : type === "role" ? (
        <GroupEditForm
          open={open}
          setOpen={setOpen}
          fetchData={fetchData}
          type={type}
          id={id}
        />
      ) : null}
    </div>
  );
};

export default DropDownButton;
