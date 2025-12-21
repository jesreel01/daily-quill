"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/lib/schemas/auth-schema";
import { authService } from "@/services/auth.service";
import { Eye, EyeOff, Hand, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.login(data);
            console.log("Login successful");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background font-display text-foreground min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-primary/30">
            <div className="layout-container flex h-full grow flex-col min-h-screen">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f4f0] dark:border-[#1e2e1e] px-6 lg:px-40 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3 text-[#111811] dark:text-white cursor-pointer select-none">
                        <span
                            className="material-symbols-outlined text-primary"
                            style={{ fontSize: "28px" }}
                        >
                            edit_square
                        </span>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                            Daily Writer
                        </h2>
                    </div>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-[#10d410] transition-colors text-[#102210] text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:shadow-md">
                        <span className="truncate">Sign Up</span>
                    </button>
                </header>

                <main className="flex-1 flex items-center justify-center px-4 py-12 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                    <div className="w-full max-w-[440px] bg-white dark:bg-[#152415] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.03)] dark:shadow-none border border-[#eef2ee] dark:border-[#1e2e1e] p-8 md:p-10 flex flex-col">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Hand className="w-6 h-6" />
                            </div>
                            <h1 className="text-foreground tracking-tight text-[28px] font-bold leading-tight mb-2">
                                Welcome back
                            </h1>
                            <p className="text-[#637563] dark:text-[#8ba28b] text-base font-normal leading-normal">
                                Continue your streak and write today.
                            </p>
                        </div>

                        <button className="flex items-center justify-center gap-3 w-full h-12 bg-white dark:bg-[#1a2c1a] border border-[#e6ece6] dark:border-[#2a3c2a] rounded-lg text-foreground font-medium hover:bg-gray-50 dark:hover:bg-[#203420] transition-all duration-200 group mb-6">
                            <img
                                alt="Google Logo"
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpqNIQNJk1CfhnYv7Dq3_kotNwc_0nwP_1ZV8mILULijpmcKIKi66mg2IJvckvirethdMkZbfDshQ7RIbfTpIOTkbpcxkVHpgmo3Atuou8ASqBhdM4uYUMqrRERgjvRPbOER_I7aFOXWv6kfHLJFvVfhR7947huYavPM7V4rbJX7cj6WH6HYLD9X87Znl7RlumUevjSzgu7xBRbbbAXZ3YonPwHf8-aJW4gTmaJU8JgT4oWHIgJcqIRBO6_itlWohw5lD5nbbLFU"
                            />
                            <span>Continue with Google</span>
                        </button>

                        <div className="relative flex py-1 items-center mb-6">
                            <div className="flex-grow border-t border-[#f0f4f0] dark:border-[#2a3c2a]"></div>
                            <span className="flex-shrink mx-4 text-xs font-medium uppercase tracking-wider text-[#9aa99a]">
                                Or
                            </span>
                            <div className="flex-grow border-t border-[#f0f4f0] dark:border-[#2a3c2a]"></div>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            <label className="flex flex-col gap-2">
                                <span className="text-foreground text-sm font-semibold leading-normal">
                                    Email Address
                                </span>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa99a] group-focus-within:text-primary transition-colors w-5 h-5" />
                                    <input
                                        {...register("email")}
                                        className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] focus:border-primary h-12 pl-12 pr-4 text-base font-normal leading-normal placeholder:text-[#9aa99a] transition-all"
                                        placeholder="name@example.com"
                                        type="email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </label>

                            <label className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-foreground text-sm font-semibold leading-normal">
                                        Password
                                    </span>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-primary hover:text-[#10d410] hover:underline decoration-primary/50 underline-offset-2 transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa99a] group-focus-within:text-primary transition-colors w-5 h-5" />
                                    <input
                                        {...register("password")}
                                        className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] focus:border-primary h-12 pl-12 pr-12 text-base font-normal leading-normal placeholder:text-[#9aa99a] transition-all"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#9aa99a] hover:text-[#111811] dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </label>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-[#10d410] active:scale-[0.99] transition-all text-[#102210] text-base font-bold leading-normal tracking-[0.015em] shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-[#102210] border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <span className="truncate">Log In</span>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[#637563] dark:text-[#8ba28b] text-sm">
                                Dont have an account?
                                <Link
                                    href="#"
                                    className="font-bold text-[#111811] dark:text-white hover:text-primary transition-colors ml-1"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>

                <footer className="py-6 text-center text-xs text-[#9aa99a] dark:text-[#4a5a4a]">
                    <p>© 2024 Daily Writer Inc. Zero friction focus.</p>
                </footer>
            </div>
        </div>
    );
}