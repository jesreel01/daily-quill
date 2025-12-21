import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function SiteHeader() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 md:px-10 sticky top-0 z-50">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex flex-1 justify-end gap-4">
                <Link href="/sign-in">
                    <Button variant="ghost" className="font-semibold">
                        Log In
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="font-semibold shadow-sm">
                        Get Started
                    </Button>
                </Link>
            </div>
        </header>
    )
}
