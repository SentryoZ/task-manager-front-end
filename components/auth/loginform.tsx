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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {sendUnauthenticatedRequest} from "@/lib/http";
import {Auth} from "@/model/auth";

const loginform = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log('Submitting login form with data:', data); // Log the data being sent
    try {
      const result = await sendUnauthenticatedRequest('POST', 'http://127.0.0.1:8000/api/auth/login', data)
      console.log('Login successful:', result); // Log the successful response

      // Save to local storage
      localStorage.setItem('access_token', result.token)
    } catch (error) {
      console.error('Login failed:', error); // Log any errors
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <Button className="w-full ">Login</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-1.438">
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-700 text-center"
        >
          Forgot password?
        </a>
      </CardFooter>
    </Card>
  );
};

export default loginform;
