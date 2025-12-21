"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/lib/schemas/auth-schema";
import { registerAction } from "@/app/actions/auth";
import { Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Logo } from "@/components/logo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterSchema) => {
        setIsLoading(true);
        setError(null);

        const result = await registerAction(data);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row bg-background antialiased selection:bg-primary/20">
            {/* Left Section: Form */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24 bg-card w-full lg:w-[600px] border-r border-border relative">
                <div className="mx-auto w-full max-w-sm lg:w-96 space-y-8">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3 cursor-pointer w-fit">
                        <Logo
                            iconClassName="w-6 h-6"
                            textClassName="text-2xl"
                        />
                    </Link>

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground">
                            Start your daily writing habit.
                        </h1>
                        <p className="mt-2 text-base text-muted-foreground">
                            Zero friction. Pure focus. Join today.
                        </p>
                    </div>

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <Input
                                                    placeholder="John Doe"
                                                    className="pl-10 h-11"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <Input
                                                    placeholder="name@example.com"
                                                    className="pl-10 h-11"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="At least 8 characters"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Repeat password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full h-12 text-base font-bold shadow-soft" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                ) : null}
                                Create Account
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?
                        <Link href="/sign-in" className="font-bold text-foreground hover:text-primary transition-colors ml-1">Sign in</Link>
                    </p>
                </div>
            </div>

            {/* Right Section: Image */}
            <div className="relative hidden w-0 flex-1 lg:block bg-muted">
                <div className="absolute inset-0 h-full w-full bg-primary/20 mix-blend-multiply transition-all duration-300 group-hover:bg-primary/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                    <Image
                        alt="Hand writing in journal"
                        className="absolute inset-0 h-full w-full object-cover contrast-[1.1]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsaGuB0t_7T3M-gTXnuRgQwE8zxFqv9gOK8hugG77JrBVWmo6hWzgtyPN1WQnL211UxfdoPGEgb3nvuWQcEpxyu5JcO548QXhq-rHD3C5OIl5Gt0I8PzT73MjQ-Fmnr5UML2pJhoCKGBZAsYrw4F47DOz8rJZF5QdIg8WyMrHD5zvE2CYLue59NchzO8GMrZWfztMraCPjz35Jx2inghoULAZ7XXXM82Jw1Jl8HgiCQM8JPR2lD6tLBjGjdh0o7vxVjySGetrGeps"
                        fill
                        priority
                    />
                </div>
            </div>
        </div>
    );
}