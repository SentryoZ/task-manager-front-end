"use client";

import {redirect, usePathname} from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import ContentWrapper from "@/components/contentwrapper/contentwrapper";
import PageWrapper from "@/components/pagewrapper/pagewrapper";

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {

    // TODO: clean up below code
    const currentPath = usePathname();

    // don't apply auth layout to these routes
    const authRoutes = ["/auth/login", "/auth/resetpassword"];

    // only apply the layout if it's not in authRoutes
    // should convert this to regex
    const useAuthLayout = !authRoutes.includes(currentPath);

    // Check if current path is not auth and don't have access token then redirect to login page
    const accessToken = localStorage.getItem('access_token');
    if (useAuthLayout && accessToken === null) {
        redirect('/auth/login')
    }

    return useAuthLayout ? (
        <div className="flex">
            <Sidebar/>
            <PageWrapper>
                <Navbar/>
                <ContentWrapper>{children}</ContentWrapper>
            </PageWrapper>
        </div>
    ) : (
        children
    );
}
