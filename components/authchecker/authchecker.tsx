import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useAuthChecker = () => {
  const path = usePathname();
  const router = useRouter();
  const [useAuthLayout, setAuthState] = useState({
    isAuthenticated: false,
    useAuthLayout: false,
  });
  const authRoutesRegex = new RegExp("/auth/(login|logout)");

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("access_token");
      if (authRoutesRegex.test(path)) {
        setAuthState({ isAuthenticated: false, useAuthLayout: false });
      } else {
        if (accessToken === null || accessToken === undefined) {
          router.push("/auth/login");
          setAuthState({ isAuthenticated: false, useAuthLayout: false });
        } else {
          setAuthState({ isAuthenticated: true, useAuthLayout: true });
        }
      }
    };

    checkAuth();
  }, [path]);

  return useAuthLayout;
};
