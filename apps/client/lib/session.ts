
import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME, REFRESH_COOKIE_NAME } from './constants';

export async function createSession(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    // Clean potentially sensitive or wrong data first if needed, 
    // though replacing overwrites.

    cookieStore.set(SESSION_COOKIE_NAME, accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    cookieStore.delete(REFRESH_COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}
