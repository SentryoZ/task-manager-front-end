"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { MdOutlineEvent } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserModel } from "@/model/userModel";
import Select from "react-select";
import { ProjectModel } from "@/model/projectModel";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [members, setMembers] = useState([]);
  const [assignMember, setAssignMember] = useState("");
  const [selectedMembers, setSelectedMembers] = useState("");
  const [projects, setProjects] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description, date, time, selectedMembers);
  };

  const fetchMembers = async () => {
    try {
      const response = await UserModel.get();
      const formattedMembers = response.data.map((member) => ({
        value: member.id,
        label: `${member.name} (${member.email})`,
      }));
      setMembers(formattedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await ProjectModel.get();
      const formattedProjects = response.data.map((project) => ({
        value: project.id,
        label: `${project.name}`,
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchProject();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MdOutlineEvent size={20} className="mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add a task to the calendar</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Projects</Label>
              <Select options={projects} placeholder="Select project..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Assign to</Label>
              <Select
                options={members}
                isMulti
                placeholder="Select members..."
                onChange={(selected: any) => {
                  setSelectedMembers(
                    selected.map((member: any) => member.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Due Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
