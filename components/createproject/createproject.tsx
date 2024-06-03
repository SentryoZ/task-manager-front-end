import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProject = () => {
  return (
    <Card className="w-full max-w-xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description of your project"
              />
            </div>
            <div></div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start space-x-[23px]">
        <Button className="w-[102px] h-[40px] "> Submit</Button>
        <Button className="w-[102px] h-[40px]" variant="outline">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateProject;
