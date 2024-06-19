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
import { axiosInstance } from "@/lib/http";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DropDownButton = ({ type, id, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [userInformation, setUserInformation] = useState({} as any);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    if (open) {
      axiosInstance.get(`api/${type}/${id}`).then((response) => {
        const userData = response.data.data; 
        setUserInformation(userData);
        const [firstName, lastName] = userData.name.split(" "); // Splitting the name into first and last name
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(userData.email);
        setRole(userData.role_name);
        setStatus(userData.status);
        console.log("User Information", userData);
      });
    }
  }, [open, type, id]);

  useEffect(() => {
    setName(`${first_name} ${last_name}`);
  }, [first_name, last_name]);

  const onEdit = async () => {
    setOpen(true);
  };
  
  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`api/${type}/${id}`, {
        name,
        email,
        role_id: role,
        status_label: status,
      });
      setOpen(true);
      
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
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
          <DropdownMenuItem onClick={onEdit}>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="space-y-3">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Click Save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex space-x-2">
              <div className="flex flex-col gap-4">
                <Label>First Name</Label>
                <Input
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label>Last Name</Label>
                <Input
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Role</Label>
              <Select
                value={role}
                onValueChange={(newValue) => setRole(newValue)}
              >
                <SelectTrigger>
                  {role === "1"
                    ? "Administration"
                    : role === "2"
                    ? "Assistant"
                    : role === "3"
                    ? "Manager"
                    : role === "4"
                    ? "Intern"
                    : ""}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="1">Administration</SelectItem>
                    <SelectItem value="2">Assistant</SelectItem>
                    <SelectItem value="3">Manager</SelectItem>
                    <SelectItem value="4">Intern</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(newValue) => setStatus(newValue)}
              >
                <SelectTrigger>
                  <SelectValue> {status === 1 ? "Open" : "Close"} </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Close </SelectItem>
                    <SelectItem value="1">Open</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DropDownButton;
