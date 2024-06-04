"use client";

import React from "react";
import {useRouter} from "next/navigation";

const LogoutPage = () => {
    const router = useRouter()
    localStorage.removeItem('access_token')
    router.push('/auth/login')
    return ("");
};

export default LogoutPage;
