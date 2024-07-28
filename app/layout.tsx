import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientlayout";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { UserProvider } from "@/useContext/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "IDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
