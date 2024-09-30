"use client";

import React from "react";
import { redirect, usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import ContentWrapper from "@/components/contentwrapper/contentwrapper";
import PageWrapper from "@/components/pagewrapper/pagewrapper";
import { ThemeProvider } from "@/components/theme-provider/themeprovider";
import { useAuthChecker } from "@/components/authchecker/authchecker";
import { useState } from "react";
import { useEffect } from "react";
import LoadingPage from "@/app/loading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, useAuthLayout } = useAuthChecker();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default is true
  const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   console.log("AuthChecker result:", useAuthLayout);
  //   setIsAuthenticated(useAuthLayout);
  // }, [useAuthLayout]);

  useEffect(() => {
    // delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const path = usePathname();
  const isLandingPage = path === "/";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isAuthenticated && useAuthLayout && !isLandingPage ? (
        <div className="flex">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <PageWrapper isSidebarOpen={isSidebarOpen}>
            <Navbar />
            <ContentWrapper>{children}</ContentWrapper>
          </PageWrapper>
        </div>
      ) : (
        <>{children}</>
      )}
    </ThemeProvider>
  );
}
