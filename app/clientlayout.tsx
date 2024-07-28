"use client";

import React from "react";
import { redirect, usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import ContentWrapper from "@/components/contentwrapper/contentwrapper";
import PageWrapper from "@/components/pagewrapper/pagewrapper";
import { ThemeProvider } from "@/components/theme-provider/themeprovider";
import { AuthChecker } from "@/components/authchecker/authchecker";
import { useState } from "react";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useAuthLayout = AuthChecker();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default is true
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   console.log("AuthChecker result:", useAuthLayout);
  //   setIsAuthenticated(useAuthLayout);
  // }, [useAuthLayout]);

  return useAuthLayout ? (
    <div className="flex">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Sidebar
          isSidebarOpen={isSidebarOpen} // pass isSidebarOpen state
          setIsSidebarOpen={setIsSidebarOpen} // pass setIsSidebarOpen function
        />
        <PageWrapper isSidebarOpen={isSidebarOpen}>
          <Navbar />
          <ContentWrapper>{children}</ContentWrapper>
        </PageWrapper>
      </ThemeProvider>
    </div>
  ) : (
    children
  );
}
