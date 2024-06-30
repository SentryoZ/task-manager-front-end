import React from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { axiosInstance } from "@/lib/http";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const ProjectEditForm = ({ open, setOpen, fetchData, type, id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [visibility, setVisibility] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Open" },
    { value: 2, label: "Close" },
  ];
  const visibilityOptions = [
    { value: 1, label: "Public" },
    { value: 2, label: "Private" },
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectResponse = await axiosInstance.get(`api/${type}/${id}`);
      setName(projectResponse.data.data.name);
      setDescription(projectResponse.data.data.description);
      setShortDescription(projectResponse.data.data.short_description);
      setVisibility(projectResponse.data.data.visibility);
      setStatus(projectResponse.data.data.status);
    };

    if (open) {
      fetchProjectData();
    }
  }, [open, type, id]);

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`api/${type}/${id}`, {
        name: name,
        description: description,
        short_description: short_description,
        visibility: visibility,
        status: status,
      });
      if (response) {
        fetchData();
        setOpen(false);
      } else {
        throw new Error("Failed to update project.");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="space-y-3">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Click Save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Short Description</Label>
              <Textarea
                value={short_description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Visibility</Label>
              <Select
                value={visibility?.toString()}
                onValueChange={(newValue) => setVisibility(Number(newValue))}
              >
                <SelectTrigger>
                  <SelectValue>
                    {
                      visibilityOptions.find(
                        (option) => option.value === visibility
                      )?.label
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Visibility</SelectLabel>
                    {visibilityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Status</Label>
              <Select
                value={status?.toString()}
                onValueChange={(newValue) => setStatus(Number(newValue))}
              >
                <SelectTrigger>
                  <SelectValue>
                    {
                      statusOptions.find((option) => option.value === status)
                        ?.label
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button  onClick={handleSubmit}>Save</Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectEditForm;
