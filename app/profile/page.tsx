"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserModel } from "@/model/userModel";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useUser } from "@/useContext/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { axiosInstance } from "@/lib/http";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    if (localUser) {
      try {
        const response = await UserModel.patch(Number(localUser.id), localUser);
        if (response) {
          updateUser(response.data);
          toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
            duration: 2000,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to update profile",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
    setLoadingProfile(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      });
      setLoadingPassword(false);
      return;
    } else if (newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Please make sure your password is at least 8 characters long.",
      });
      setLoadingPassword(false);
      return;
    }
    try {
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/profile/update-password", {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
        force_logout: false,
      });
      if (response) {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
        duration: 2000,
      });
        localStorage.removeItem("access_token");
        router.push("/auth/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update password",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log(error);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>
      <div className="flex-grow flex w-full max-w-2xl">
        <div className="grid gap-12 w-full">
          <div className="space-y-4 flex flex-col h-full">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-2xl font-bold"></Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={localUser?.avatar}></AvatarImage>
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="grid space-y-2">
                  <Button variant="default">Change Picture</Button>
                  <Button variant="outline">Remove Picture</Button>
                </div>
              </div>
            </div>
            <form
              className="space-y-6 flex-grow flex flex-col"
              onSubmit={handleSaveProfile}
            >
              <div className="flex-grow">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={localUser?.name}
                    onChange={(e) => {
                      setLocalUser({ ...localUser, name: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={localUser?.email}
                    onChange={(e) => {
                      setLocalUser({ ...localUser, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={loadingProfile}>
                {loadingProfile ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </form>
          </div>
          <hr className="border-gray-200" />
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form
              className="space-y-6 flex-grow flex flex-col"
              onSubmit={handleUpdatePassword}
            >
              <div className="flex-grow">
                <div className="space-y-1">
                  <Label htmlFor="old_password">Current Password</Label>
                  <Input
                    id="old_password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_password_confirmation">
                    Confirm New Password
                  </Label>
                  <Input
                    id="new_password_confirmation"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={loadingPassword}>
                {loadingPassword ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
