"use client";

import Link from "next/link";
import { Plus, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";
import { Logo } from "@/components/logo";

interface AppHeaderProps {
    title?: string;
    className?: string;
}

export function AppHeader({ title = "Zero", className }: AppHeaderProps) {
    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <div className={cn("fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-10 py-3", className)}>
            <div className="flex items-center justify-between whitespace-nowrap">
                <div className="flex items-center gap-4 text-foreground">
                    <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
                        <Logo iconClassName="w-4 h-4" textClassName="text-base" />
                    </Link>
                    <div className="h-4 w-px bg-border hidden sm:block" />
                    <h2 className="text-foreground text-sm font-bold leading-tight tracking-[-0.015em] hidden sm:block">{title}</h2>
                </div>
                <div className="flex flex-1 justify-end gap-4 sm:gap-8 items-center">
                    <div className="hidden md:flex items-center gap-9">
                        <Link
                            className="text-muted-foreground hover:text-foreground text-sm font-medium leading-normal transition-colors"
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            className="text-muted-foreground hover:text-foreground text-sm font-medium leading-normal transition-colors"
                            href="#"
                        >
                            Settings
                        </Link>
                    </div>
                    <Link href="/write">
                        <Button className="h-9 px-4 text-sm font-bold leading-normal tracking-[0.015em]">
                            <Plus className="mr-2 h-4 w-4" />
                            <span className="truncate">New Entry</span>
                        </Button>
                    </Link>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-border cursor-pointer bg-secondary hover:ring-2 hover:ring-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZuUV0JEXC4Xnjuc1prHIvDVguZ1ouXAI3bE81MVZ_r5i01c6SRz7dN4cUhY9vFHSekTkZlWXrEBos9GjTnF0oB4trFlLJzBfF-vai7oiur6IQiJ84VJk0AHWpFRm_07IjLQaYm3LuaI4T-0MQrdx6MPWlG9wNWugPPHwwJ0n-eejl1qq3eqY_58kl_rOYNrgraSVGH9sXUoaHvAer5TMnhy25TFGu1AA-svOKjSIwOcL0Wsf6HkFoCpy7N55H83HThJAxSDF7JDQ")' }}>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
