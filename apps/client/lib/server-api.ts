import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, REFRESH_COOKIE_NAME } from './constants';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function refreshAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();
        if (result.data?.accessToken && result.data?.refreshToken) {
            const { createSession } = await import('./session');
            await createSession(result.data.accessToken, result.data.refreshToken);
            return result.data.accessToken;
        }
        return null;
    } catch {
        return null;
    }
}

export async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    const cookieStore = await cookies();
    let token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        console.warn('[Server API] No auth token found in cookies, attempting refresh...');
        const refreshedToken = await refreshAccessToken();
        if (!refreshedToken) {
            console.warn('[Server API] Refresh failed, no token available.');
            return null;
        }
        token = refreshedToken;
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    try {
        let response = await fetch(url, {
            ...options,
            headers,
            cache: 'no-store',
        });

        if (response.status === 401) {
            console.warn('[Server API] Token expired (401), attempting refresh...');
            const newToken = await refreshAccessToken();
            if (newToken) {
                (headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
                response = await fetch(url, {
                    ...options,
                    headers,
                    cache: 'no-store',
                });
            }
        }

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            console.error(`[Server API] Request failed: ${response.status}`);
            return null;
        }

        const result = await response.json();
        return result.data ?? result;
    } catch (error) {
        console.error('[Server API] Fetch error:', error);
        return null;
    }
}
