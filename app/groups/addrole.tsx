"use client";
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
import { Button } from "@/components/ui/button";
import PolicyConstants from "@/constant/constant";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleModel } from "@/model/roleModel";

const AddRole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedPolicies, setCheckedPolicies] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    roleDescription: "",
    policies: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (policyValue) => (event) => {
    const isChecked = event.target.checked;
    setCheckedPolicies((prevState) => {
      const updatedState = { ...prevState };
      if (isChecked) {
        updatedState[policyValue] = true;
      } else {
        delete updatedState[policyValue];
      }
      return updatedState;
    });
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    if (!selectAll) {
      let allPolicies = {};
      [
        ...Object.values(PolicyConstants.USER),
        ...Object.values(PolicyConstants.PROJECT),
        ...Object.values(PolicyConstants.ROLE),
      ].forEach((policy) => {
        allPolicies[policy] = true;
      });
      setCheckedPolicies(allPolicies);
    } else {
      setCheckedPolicies({});
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedPolicies = Object.keys(checkedPolicies).filter(
      (key) => checkedPolicies[key]
    );

    const finalFormData = {
      ...formData,
      policies: selectedPolicies,
    };

    try {
      const response = await RoleModel.create(finalFormData);
      if (response) {
        setIsOpen(false);
      }
    } catch (e) {
      throw new Error("Failed to create role");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          + Add Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>Click submit when you're done.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h2 className="font-semibold">
              Role Information <span style={{ color: "red" }}>*</span>
            </h2>
            <div className="flex items-center justify-between gap-4">
              <Label className="flex-shrink-0">Role Name</Label>
              <Input
                name="name"
                className="flex-grow"
                placeholder="Role name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label className="flex-shrink-0">Role Description</Label>
              <Input
                name="roleDescription"
                className="flex-grow"
                placeholder="Role description"
                value={formData.roleDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <hr />
            <div className="space-y-3">
              <h2 className="font-semibold">
                Permissions <span style={{ color: "red" }}>*</span>
              </h2>
              <div>
                  <h3 className="font-semibold">Select All</h3>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    Select All
                  </div>
                </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">User Policies</h3>
                  <ul>
                    {Object.keys(PolicyConstants.USER).map((key) => (
                      <div key={key} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={!!checkedPolicies[PolicyConstants.USER[key]]}
                          onChange={handleCheckboxChange(
                            PolicyConstants.USER[key]
                          )}
                        />
                        {PolicyConstants.USER[key]}
                      </div>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Project Policies</h3>
                  <ul>
                    {Object.keys(PolicyConstants.PROJECT).map((key) => (
                      <div key={key} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={
                            !!checkedPolicies[PolicyConstants.PROJECT[key]]
                          }
                          onChange={handleCheckboxChange(
                            PolicyConstants.PROJECT[key]
                          )}
                        />
                        {PolicyConstants.PROJECT[key]}
                      </div>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Role Policies</h3>
                  <ul>
                    {Object.keys(PolicyConstants.ROLE).map((key) => (
                      <div key={key} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={!!checkedPolicies[PolicyConstants.ROLE[key]]}
                          onChange={handleCheckboxChange(
                            PolicyConstants.ROLE[key]
                          )}
                        />
                        {PolicyConstants.ROLE[key]}
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRole;
