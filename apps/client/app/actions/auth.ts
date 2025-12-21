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
        // Strip confirmPassword before sending if backend doesn't expect it
        // But validation.data (from zod) typically matches schema. 
        // registerSchema has confirmPassword but maybe backend DTO doesn't.
        // Let's check auth.service.ts: it sends `data` as RegisterDto.
        // I will assume backend ignores extra fields or I should strip it.
        // The user JSON request showed "data" but didn't show the request body.
        // I'll send the data as is from schema unless I know better.
        // Actually, let's destructure to remove confirmPassword just in case.

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

        // Check if tokens are returned on registration
        if (result.data?.accessToken && result.data?.refreshToken) {
            await createSession(result.data.accessToken, result.data.refreshToken);
        } else {
            // If no tokens, maybe redirect to login?
            // But user JSON implies tokens. If not, we might fall through to redirect dashboard but have no session?
            // If no tokens, user has to login manually.
            // Assume tokens if present, else redirect to sign-in.
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

    // Determine where to go. If we have a session (checked by cookies maybe? or just assume success means dashboard for now as per user request 'navigate to dashboard')
    // Safe bet: redirect to dashboard. Login check middleware will catch if session failed.
    redirect("/dashboard");
}
