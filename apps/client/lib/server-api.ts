import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './constants';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        console.warn('[Server API] No auth token found in cookies.');
        return null;
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            cache: 'no-store',
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            console.error(`[Server API] Request failed: ${response.status}`);
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('[Server API] Fetch error:', error);
        return null;
    }
}
