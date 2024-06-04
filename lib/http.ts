import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL ?? "127.0.0.0:8000",
    withCredentials: true,
    withXSRFToken: true
})

export async function fetchCsrfToken() {
    const response = await fetch('');
    if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
    }
    const responseData = await response.json();
    if (responseData.status != 200){
        throw new Error('Failed to fetch CSRF token');
    }
    return responseData.data;
}

export async function sendUnauthenticatedRequest(method: string, url: string | URL | Request, data: object){
    const response =  await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseData = await response.json()
    return responseData.data;
}

export async function sendRequest(method: string, url: string | URL | Request, data: object) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    // Check if status is not 200
    if (responseData.status != 200){
        // Show alert with message
    }

    return responseData;
}