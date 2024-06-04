"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import ContentWrapper from "@/components/contentwrapper/contentwrapper";
import PageWrapper from "@/components/pagewrapper/pagewrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/auth/login", "/auth/resetpassword"];  // don't apply rootlayout to these routes

  const useLayout = !noLayoutRoutes.includes(pathname);    // only apply the layout if its not in noLayoutRoutes
 
  return useLayout ? (
    <div className="flex">
      <Sidebar />
      <PageWrapper>
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
      </PageWrapper>
    </div>
  ) : (
    children
  );
}
