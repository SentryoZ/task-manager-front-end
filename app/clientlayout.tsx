"use client";

import React from "react";
import { redirect, usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import ContentWrapper from "@/components/contentwrapper/contentwrapper";
import PageWrapper from "@/components/pagewrapper/pagewrapper";
import { ThemeProvider } from "@/components/theme-provider/themeprovider";
import { AuthChecker } from "@/components/authchecker/authchecker";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useAuthLayout = AuthChecker();

  return useAuthLayout ? (
    <div className="flex">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Sidebar />
        <PageWrapper>
          <Navbar />
          <ContentWrapper>{children}</ContentWrapper>
        </PageWrapper>
      </ThemeProvider>
    </div>
  ) : (
    children
  );
}
