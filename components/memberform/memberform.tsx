import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "@/lib/http";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { RoleModel } from "@/model/roleModel";

const MemberEditForm = ({ open, setOpen, fetchData, type, id }) => {
  const [userInformation, setUserInformation] = useState({} as any);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [role, setRole] = useState(""); // This will hold the role ID
  const [roleName, setRoleName] = useState("Select Role");
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [roles, setRoles] = useState([] as any);

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await axiosInstance.get(`api/${type}/${id}`);
      setUserInformation(userResponse.data.data);
      const roleResponse = await RoleModel.get();
      setRoles(roleResponse.data);
    };

    if (open) {
      fetchUserData();
    }
  }, [open, type, id]);

  useEffect(() => {
    if (userInformation && roles.length > 0) {
      setName(userInformation.name);
      setEmail(userInformation.email);
      const matchingRole = roles.find(
        (role) => role.id === userInformation.role
      );
      if (matchingRole) {
        setRole(matchingRole.id); // Set the role ID
        setRoleName(matchingRole.name); // Set the role name for display
      } else {
        setRole("Select Role");
      }
      setStatus(userInformation.status);
    }
  }, [userInformation, roles]);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`api/${type}/${id}`, {
        name,
        email,
        role_id: role,
        status: status,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleChange = (newValue) => {
    setRole(newValue);
    const selectedRoleName = roles.find((role) => role.id === newValue)?.name;
    setRoleName(selectedRoleName);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="space-y-3">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Click Save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-4">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Role</Label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger>{roleName}</SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status?.toString()}
                onValueChange={(newValue) => setStatus(Number(newValue))}
              >
                <SelectTrigger>
                  <SelectValue>{status === 1 ? "Open" : "Close"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Close</SelectItem>
                    <SelectItem value="1">Open</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberEditForm;
