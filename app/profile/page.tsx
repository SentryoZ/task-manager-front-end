"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserModel } from "@/model/userModel";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useUser } from "@/useContext/UserContext";
import { axiosInstance } from "@/lib/http";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    getValues,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const handleSaveProfile = async (data: FieldValues) => {
    setLoadingProfile(true);
    if (user) {
      try {
        const response = await UserModel.patch(Number(user.id), {
          ...user,
          name: data.name,
          email: data.email,
        });
        if (response) {
          updateUser(response.data);
          alert("Profile updated successfully.");
        }
      } catch (error) {
        alert("Failed to update profile.");
      }
    }
    setLoadingProfile(false);
  };

  const handleChangePassword = async (data: FieldValues) => {
    setLoadingPassword(true);
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/profile/update-password",
        {
          old_password: data.old_password,
          new_password: data.new_password,
          new_password_confirmation: data.new_password_confirmation,
          force_logout: false,
        }
      );
      if (response) {
        localStorage.removeItem("access_token");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleAvatarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('The avatar field must be a file of type: jpg, png.');
        return;
      }
      setValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>
      <div className="flex-grow flex w-full max-w-2xl">
        <div className="grid w-full">
          <div className="space-y-4 flex flex-col h-full">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-2xl font-bold"></Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar}></AvatarImage>
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="grid space-y-2">
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarInput}
                    style={{ display: 'none' }}
                  />
                  <Button variant="default" onClick={() => document.getElementById('avatar')?.click()}>
                    Change Picture
                  </Button>
                  <Button variant="outline">Remove Picture</Button>
                </div>
              </div>
            </div>
            <form
              className="flex-grow flex flex-col"
              onSubmit={handleSubmit(handleSaveProfile)}
            >
              <div className="flex-grow">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "This field is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Invalid name",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message as string}
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={loadingProfile}
              >
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
              className="flex-grow flex flex-col"
              onSubmit={handleSubmitPassword(handleChangePassword)}
            >
              <div className="flex-grow">
                <div className="space-y-1">
                  <Label htmlFor="old_password">Current Password</Label>
                  <Input
                    id="old_password"
                    type="password"
                    {...registerPassword("old_password", {
                      required: "Please enter your current password",
                    })}
                  />
                  {errorsPassword.old_password && (
                    <span className="text-red-500 text-sm">
                      {errorsPassword.old_password.message as string}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    {...registerPassword("new_password", {
                      required: "Please enter your new password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errorsPassword.new_password && (
                    <span className="text-red-500 text-sm">
                      {errorsPassword.new_password.message as string}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_password_confirmation">
                    Confirm New Password
                  </Label>
                  <Input
                    id="new_password_confirmation"
                    type="password"
                    {...registerPassword("new_password_confirmation", {
                      required: "Please confirm your new password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      validate: (value) =>
                        value === getValues("new_password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errorsPassword.new_password_confirmation && (
                    <span className="text-red-500 text-sm">
                      {
                        errorsPassword.new_password_confirmation
                          .message as string
                      }
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={loadingPassword}
              >
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
