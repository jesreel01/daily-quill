import type { LoginSchema, RegisterSchema } from "@/lib/schemas/auth-schema";
import type { RegisterDto, LoginDto } from "@repo/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const authService = {
  async login(credentials: LoginDto) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    return response.json();
  },

  async register(data: RegisterDto) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create account");
    }

    return response.json();
  },
};
