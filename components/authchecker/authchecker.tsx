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
          router.push("/");
          setAuthState({ isAuthenticated: false, useAuthLayout: false });
        } else {
          if (accessToken) {
            setAuthState({ isAuthenticated: true, useAuthLayout: true });
          } else {
            setAuthState({ isAuthenticated: false, useAuthLayout: false });
          }
        }
      }
    };

    checkAuth();
  }, [path]);

  return useAuthLayout;
};
