import React, { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";

export const AuthChecker = () => {
  const path = usePathname();
  const [useAuthLayout, setUseAuthLayout] = useState(true);
  const authRoutesRegex = new RegExp("^/auth/(login|logout)$");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (authRoutesRegex.test(path)) {
      // path = login or logout, the layout wont be used
      setUseAuthLayout(false);
    } else {
      setUseAuthLayout(true);
      // otherwise, check if the user is authenticated
      if (accessToken === null || accessToken === undefined) {
        redirect("/auth/login");
      }
    }
  }, [path]);

  return useAuthLayout;
};
