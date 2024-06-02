"use client";

import React from "react";
import LoginForm from "@/components/auth/loginform";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-5 text-center md:text-left">
        <h1 className="text-xl font-bold md:text-2xl">Company Name</h1>
      </header>
      <div className="flex-grow flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
