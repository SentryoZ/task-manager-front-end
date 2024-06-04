"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

const LogoutPage = () => {
    localStorage.removeItem('access_token')
    const router = useRouter()

    useEffect(() => {
        router.push('/auth/login')
    });
};

export default LogoutPage;
