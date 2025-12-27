"use server";

import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "@/lib/schemas/auth-schema";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type ActionState = {
    error?: string;
    success?: boolean;
};

export async function loginAction(data: LoginSchema): Promise<ActionState | void> {
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
        return { error: "Invalid fields" };
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.message || "Failed to login" };
        }

        if (result.data?.accessToken && result.data?.refreshToken) {
            await createSession(result.data.accessToken, result.data.refreshToken);
        } else {
            return { error: "Invalid response from server" };
        }

    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error("Login error:", error);
        return { error: "Something went wrong. Please try again." };
    }

    redirect("/dashboard");
}

export async function registerAction(data: RegisterSchema): Promise<ActionState | void> {
    const validation = registerSchema.safeParse(data);
    if (!validation.success) {
        return { error: "Invalid fields" };
    }

    try {
        const { confirmPassword, ...registerData } = validation.data;

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.message || "Failed to create account" };
        }

        if (result.data?.accessToken && result.data?.refreshToken) {
            await createSession(result.data.accessToken, result.data.refreshToken);
        } else {
            if (!result.data?.accessToken) {
                // return redirect("/sign-in"); // Can't redirect here?
                // We will handle redirect at the end
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error("Registration error:", error);
        return { error: "Something went wrong. Please try again." };
    }

    redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
    const { deleteSession } = await import("@/lib/session");
    await deleteSession();
    redirect("/sign-in");
}

export async function refreshSessionAction(): Promise<ActionState | void> {
    const { createSession } = await import("@/lib/session");
    const { cookies } = await import("next/headers");
    const { REFRESH_COOKIE_NAME } = await import("@/lib/constants");
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    if (!refreshToken) {
        return { error: "No refresh token" };
    }

    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.message || "Failed to refresh token" };
        }

        if (result.data?.accessToken && result.data?.refreshToken) {
             await createSession(result.data.accessToken, result.data.refreshToken);
             return { success: true };
        }

        return { error: "Invalid response" };

    } catch (error) {
        console.error("Refresh error:", error);
        return { error: "Refresh failed" };
    }
}
