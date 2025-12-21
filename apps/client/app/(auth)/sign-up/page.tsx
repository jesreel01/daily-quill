"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/lib/schemas/auth-schema";
import { authService } from "@/services/auth.service";
import { Eye, EyeOff, Lock, Mail, Edit3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.register(data);
            console.log("Registration successful");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row bg-background font-display text-foreground antialiased selection:bg-primary/30">
            {/* Left Section: Form */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-[#152415] w-full lg:w-[600px] border-r border-[#f0f4f0] dark:border-[#1e2e1e] relative">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3 mb-10 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-[#102210] group-hover:scale-105 transition-transform">
                            <Edit3 className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">DailyWriter</h2>
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-foreground">
                            Start your daily writing habit.
                        </h1>
                        <p className="mt-2 text-base text-[#637563] dark:text-[#8ba28b]">
                            Zero friction. Pure focus. Join today.
                        </p>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] px-3 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-gray-50 dark:hover:bg-[#203420] transition-all" type="button">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpqNIQNJk1CfhnYv7Dq3_kotNwc_0nwP_1ZV8mILULijpmcKIKi66mg2IJvckvirethdMkZbfDshQ7RIbfTpIOTkbpcxkVHpgmo3Atuou8ASqBhdM4uYUMqrRERgjvRPbOER_I7aFOXWv6kfHLJFvVfhR7947huYavPM7V4rbJX7cj6WH6HYLD9X87Znl7RlumUevjSzgu7xBRbbbAXZ3YonPwHf8-aJW4gTmaJU8JgT4oWHIgJcqIRBO6_itlWohw5lD5nbbLFU" alt="Google" width={20} height={20} />
                            <span>Google</span>
                        </button>
                        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] px-3 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-gray-50 dark:hover:bg-[#203420] transition-all" type="button">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="dark:invert" alt="Apple" width={18} height={18} />
                            <span>Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#f0f4f0] dark:border-[#2a3c2a]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-medium uppercase tracking-wider">
                            <span className="bg-white dark:bg-[#152415] px-4 text-[#9aa99a]">Or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-foreground" htmlFor="email">Email address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa99a] group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    {...register("email")}
                                    className="block w-full rounded-lg border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] py-3 pl-12 pr-4 text-foreground placeholder:text-[#9aa99a] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-foreground" htmlFor="password">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa99a] group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    {...register("password")}
                                    className="block w-full rounded-lg border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] py-3 pl-12 pr-12 text-foreground placeholder:text-[#9aa99a] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                    id="password"
                                    placeholder="At least 8 characters"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#9aa99a] hover:text-foreground">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-foreground" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa99a] group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    {...register("confirmPassword")}
                                    className="block w-full rounded-lg border border-[#e6ece6] dark:border-[#2a3c2a] bg-white dark:bg-[#1a2c1a] py-3 pl-12 pr-12 text-foreground placeholder:text-[#9aa99a] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                    id="confirmPassword"
                                    placeholder="Repeat password"
                                    type={showConfirmPassword ? "text" : "password"}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#9aa99a] hover:text-foreground">
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-[#10d410] active:scale-[0.99] transition-all text-[#102210] text-base font-bold shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-[#102210] border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <span className="truncate">Create Account</span>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#637563] dark:text-[#8ba28b]">
                        Already have an account?
                        <Link href="/login" className="font-bold text-foreground hover:text-primary transition-colors ml-1">Log In</Link>
                    </p>

                    {/* Trust Indicator */}
                    <div className="mt-10 flex items-center justify-center gap-4 opacity-80">
                        <div className="flex -space-x-3">
                            <div className="h-9 w-9 rounded-full border-2 border-white dark:border-[#152415] bg-gray-200 overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User 1" fill />
                            </div>
                            <div className="h-9 w-9 rounded-full border-2 border-white dark:border-[#152415] bg-gray-200 overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User 2" fill />
                            </div>
                            <div className="h-9 w-9 rounded-full border-2 border-white dark:border-[#152415] bg-gray-200 overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User 3" fill />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-foreground">Join 10,000+ daily writers</p>
                    </div>
                </div>
            </div>

            {/* Right Section: Image */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <div className="absolute inset-0 h-full w-full bg-[#102210]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102210]/90 via-[#102210]/20 to-transparent z-10"></div>
                    <Image
                        alt="Hand writing in journal"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsaGuB0t_7T3M-gTXnuRgQwE8zxFqv9gOK8hugG77JrBVWmo6hWzgtyPN1WQnL211UxfdoPGEgb3nvuWQcEpxyu5JcO548QXhq-rHD3C5OIl5Gt0I8PzT73MjQ-Fmnr5UML2pJhoCKGBZAsYrw4F47DOz8rJZF5QdIg8WyMrHD5zvE2CYLue59NchzO8GMrZWfztMraCPjz35Jx2inghoULAZ7XXXM82Jw1Jl8HgiCQM8JPR2lD6tLBjGjdh0o7vxVjySGetrGeps"
                        fill
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-20 z-20">
                        <blockquote className="max-w-xl border-l-4 border-primary pl-8">
                            <p className="text-3xl font-medium leading-relaxed italic text-white mb-6">
                                "The scariest moment is always just before you start. DailyWriter removed that fear for me."
                            </p>
                            <footer className="text-white">
                                <div className="font-bold text-xl">Sarah Jenkins</div>
                                <div className="text-[#8ba28b] flex items-center gap-2 mt-1">
                                    Published Author <ArrowRight className="w-4 h-4 text-primary" />
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}