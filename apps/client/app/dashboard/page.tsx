
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="flex items-center justify-between px-6 lg:px-40 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b">
                <div className="flex items-center gap-3 select-none">
                    <h2 className="text-lg font-bold tracking-tight">
                        Daily Quill
                    </h2>
                </div>
                <div>
                    {/* Logout functionality would need a server action too, but leaving blank for now */}
                    <Button variant="ghost">Profile</Button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Hand className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground max-w-[600px]">
                    Welcome to your dashboard. You are successfully logged in.
                </p>
                <div className="flex gap-4">
                    <Button>
                        Write New Entry
                    </Button>
                    <Button variant="outline">
                        View History
                    </Button>
                </div>
            </main>
        </div>
    );
}
