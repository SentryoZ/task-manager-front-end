import axios from 'axios';
import {toast} from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL ?? "http://127.0.0.1:8000/",
    withCredentials: true,
    withXSRFToken: true,
})

axiosInstance.interceptors.request.use(function (config) { 
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ` + token;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export async function sendUnauthenticatedRequest(method: string, url: string, data: object) {
    try {
        const response = await axiosInstance.request({
            method,
            url,
            data,
        })
        return response.data
    } catch (e: any) {
        console.log(e)
        toast({
            variant: "destructive",
            title: e.response.data.message
        })
        return null
    }

}

export async function sendRequest(method: string, url: string, data: object) {
    const router = useRouter()
    try {
        const response = await axiosInstance.request({
            method,
            url,
            data
        })
        return response.data
    } catch (e: any) {
        // Redirect to login page if response have authenticated error
        if (e.response.status === 401) {
            router.push('auth/login')
        } else {
            toast({
                variant: "destructive",
                title: e.response.data.message
            })
            return null
        }
    }
}