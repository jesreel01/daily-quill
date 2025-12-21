import { Feather } from "lucide-react"

interface LogoProps {
    className?: string
    iconClassName?: string
    textClassName?: string
}

export function Logo({ className, iconClassName = "w-5 h-5", textClassName = "text-lg" }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 select-none ${className || ""}`}>
            <div className="size-8 flex items-center justify-center text-primary bg-primary/10 rounded-lg">
                <Feather className={iconClassName} />
            </div>
            <h2 className={`${textClassName} font-bold leading-tight tracking-tight text-foreground`}>
                Daily Quill
            </h2>
        </div>
    )
}
