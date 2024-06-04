"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sendUnauthenticatedRequest } from "@/lib/http";
import Link from "next/link";
import { fetchCsrfToken } from "@/lib/http";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const data = [email, password]; // Prepare the data to be sent
    console.log("Submitting login form with data:", data); // Log the data being sent

    try {
      // Send the login request
      const result = await sendUnauthenticatedRequest(
        "POST",
        "http://127.0.0.1:8000/api/auth/login",
        data
      );
      console.log("Login successful:", result); // Log the successful response

      // Save to local storage
      localStorage.setItem("access_token", result.token);
    } catch (error) {
      console.error("Login failed:", error); // Log any errors
    }
  };

  return (
    <Card className="grid items-center w-full max-w-[400px] h-full max-h-[372px] border-none shadow-none">
      <CardHeader>
        <div className="flex items-center justify-center">
          <Avatar style={{ width: "100px", height: "100px" }}>
            <AvatarImage
              src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
              alt="N/A"
            />
          </Avatar>
        </div>
        <CardTitle className="text-1xl font-bold text-center">
          Company Name
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-2">
          <div className="space-x-2">
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="email@domain.com"
              value={email} // Bind value to state
              onChange={(e) => {
                setEmail(e.target.value); // Update state on change
              }}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={password} // Bind value to state
              onChange={(e) => {
                setPassword(e.target.value); // Update state on change
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" onClick={onSubmit} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-1.438">
        <Link
          href="/auth/resetpassword"
          className="text-sm text-blue-500 hover:text-blue-700 text-center"
        >
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
