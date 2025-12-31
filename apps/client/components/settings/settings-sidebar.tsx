"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Bell, Palette, Database, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfileCard } from "./user-profile-card";

const settingsNavItems = [
  {
    label: "General",
    href: "/settings/general",
    icon: Settings,
  },
  {
    label: "Profile",
    href: "/settings/profile",
    icon: User,
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    label: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
  },
  {
    label: "Data & Account",
    href: "/settings/data-and-account",
    icon: Database,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card p-6 h-[calc(100vh-65px)] sticky top-[65px] overflow-hidden">
      <UserProfileCard />
      <nav className="flex flex-col gap-2 overflow-y-auto flex-1">
        {settingsNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                isActive
                  ? "bg-secondary border border-border shadow-sm"
                  : "hover:bg-secondary/50"
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-all",
                  isActive
                    ? "text-primary group-hover:scale-110"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <p
                className={cn(
                  "text-sm font-medium leading-normal",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
