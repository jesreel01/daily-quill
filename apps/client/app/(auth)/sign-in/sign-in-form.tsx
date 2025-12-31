"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/lib/schemas/auth-schema";
import { loginAction } from "@/app/actions/auth";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        setError(null);

        const result = await loginAction(data);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background min-h-screen flex flex-col antialiased selection:bg-primary/20">
            <header className="flex items-center justify-between px-6 lg:px-40 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/">
                    <Logo />
                </Link>
                <Button asChild>
                    <Link href="/sign-up">Sign Up</Link>
                </Button>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-[5000ms]"></div>

                <Card className="w-full max-w-[440px] shadow-xl border-border/50 bg-card/95 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-2 pb-6">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 text-primary">
                            <Logo iconClassName="w-6 h-6" textClassName="hidden" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                        <CardDescription className="text-base">
                            Continue your streak and write today.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <Input
                                                        placeholder="name@example.com"
                                                        className="pl-10 h-11 bg-background"
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
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    href="#"
                                                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {error && (
                                    <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full h-11 font-bold shadow-soft" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                    ) : null}
                                    Log In
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center pb-8 pt-0">
                        <p className="text-muted-foreground text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </main>

            <footer className="py-6 text-center text-xs text-muted-foreground">
                <p>© 2024 Daily Quill. Zero friction focus.</p>
            </footer>
        </div>
    );
}
