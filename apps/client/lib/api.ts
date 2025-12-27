import { SESSION_COOKIE_NAME } from './constants';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = getCookie(SESSION_COOKIE_NAME);
    
    if (!token) {
        console.warn('[API] No auth token found in cookies. User may need to log in again.');
    }
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers,
        cache: 'no-store',
    });

    if (response.status === 401) {
        try {
            const { refreshSessionAction } = await import("@/app/actions/auth");
            const result = await refreshSessionAction();
            
            if (result && 'success' in result && result.success) {
                const newToken = getCookie(SESSION_COOKIE_NAME);
                if (newToken) {
                    (headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
                    const retryResponse = await fetch(url, {
                        ...options,
                        credentials: 'include',
                        headers,
                        cache: 'no-store',
                    });
                    if (retryResponse.ok) {
                        return retryResponse.json();
                    }
                }
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json();
}
