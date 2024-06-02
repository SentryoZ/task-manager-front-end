import axios from 'axios';
import { url } from 'inspector';
import { string } from 'zod';

export interface HttpData {
    status: number,
    message: string,
    data: Record<string, any>,
    debugMessage: string|null
}



export async function fetchCsrfToken() {
    const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    });
    const response = await api.get('/sanctum/csrf-cookie');
    if (!response.data) {
      throw new Error('Failed to fetch CSRF token');
    }
}

export async function sendUnauthenticatedRequest(method: string, url: string | URL | Request, data: Array<any>){
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
    const responseData: HttpData = await response.json()
    return responseData.data;
}

export async function sendRequest(method: string, url: string | URL | Request, data: Array<any>) {
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
    const responseData: HttpData = await response.json();
    // Check if status is not 200
    if (responseData.status != 200){
        // Show alert with message
    }

    return responseData;
}