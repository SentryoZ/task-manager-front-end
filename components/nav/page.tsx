import LoginPage from "@/app/auth/login/page";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../themetoggle/themetoggle";
import Link from "next/link";

export function Nav() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 bg-background mt-2">
        <div className="flex flex-col md:w-[720px] w-[90%] border rounded-xl dark:border-zinc-900 p-2 bg-background">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="font-bold text-sm">Task.manager</div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle variant={"ghost"} />
              <Link className="cursor-pointer" href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
