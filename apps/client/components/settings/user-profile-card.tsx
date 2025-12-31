"use client";

import Image from "next/image";

interface UserProfileCardProps {
  name?: string;
  avatarUrl?: string;
}

export function UserProfileCard({
  name = "Jane Doe",
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAlARRYgFt09h_4tGGGruYDeXLVvspEqeljmYsg-cZYOY35jcKXTJevE7pXWm-XM66WaRjwcZ-uMTzq1boi4PSoQIVp-1VNV-pvUKtw95Gdrvrf0yF1DeZZQT98ceJcOK-SkgRWC7B3OebXMA0nChONaNEfIB4hhRSPcnpD3e7IeWexSA5KaoXi9YuGTtcn4J7ow1p-iBgfJccOFRx2uxvw-awg0fuNyRnphOfMwXcXQxPWRS3bd5t41IdlQ-kaRcxoQUygI6HtHrg",
}: UserProfileCardProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative size-12 rounded-full overflow-hidden shadow-sm border border-border">
        <Image
          src={avatarUrl}
          alt={`${name}'s profile picture`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-foreground text-base font-bold leading-normal">
          {name}
        </h1>
      </div>
    </div>
  );
}
