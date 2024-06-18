import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/http";
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

const AddMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  useEffect(() => {
    setName(`${first_name} ${last_name}`);
  }, [first_name, last_name]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    console.log("submitting form");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role_id', role);
    formData.append('status', status.toString());
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axiosInstance.post("api/user", formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("Avatar:", avatar);
      console.log("Member created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          + Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Click submit when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex space-x-1">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  placeholder="Enter their first name..."
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  placeholder="Enter their last name..."
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="domain@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(newValue) => setRole(newValue)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="1">Administration </SelectItem>
                    <SelectItem value="2">Manager</SelectItem>
                    <SelectItem value="3">Assistant</SelectItem>
                    <SelectItem value="4">Intern</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status?.toString()}
                onValueChange={(newValue) => setStatus(Number(newValue))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="0">Disabled </SelectItem>
                    <SelectItem value="1">Enabled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input id="avatar" type="file" onChange={handleImageChange} />
            </div>
            <DialogFooter className="flex">
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
