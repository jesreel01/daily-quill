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
