export function SiteFooter() {
    return (
        <div className="w-full py-8 text-center border-t border-border bg-card">
            <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Daily Quill. Designed for your peace of mind.
            </p>
        </div>
    )
}
