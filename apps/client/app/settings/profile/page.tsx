import Image from "next/image";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-base">
          Update your photo and personal details.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <form className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-border">
            <div className="relative size-20 rounded-full overflow-hidden shadow-sm border border-border">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlARRYgFt09h_4tGGGruYDeXLVvspEqeljmYsg-cZYOY35jcKXTJevE7pXWm-XM66WaRjwcZ-uMTzq1boi4PSoQIVp-1VNV-pvUKtw95Gdrvrf0yF1DeZZQT98ceJcOK-SkgRWC7B3OebXMA0nChONaNEfIB4hhRSPcnpD3e7IeWexSA5KaoXi9YuGTtcn4J7ow1p-iBgfJccOFRx2uxvw-awg0fuNyRnphOfMwXcXQxPWRS3bd5t41IdlQ-kaRcxoQUygI6HtHrg"
                alt="Profile picture"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button type="button" variant="outline">
                  Change photo
                </Button>
                <Button type="button" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  Remove
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Recommended: Square JPG, PNG, or GIF, at least 1000 pixels per
                side.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground text-sm">@</span>
                </div>
                <Input
                  id="username"
                  type="text"
                  defaultValue="janedoe"
                  className="pl-7"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                defaultValue="Jane Doe"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-muted-foreground size-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  defaultValue="jane@example.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              className="rounded-md border border-input bg-transparent text-foreground text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-full py-2 px-3 shadow-xs resize-none outline-none min-h-[100px]"
              id="bio"
              placeholder="Write a short bio..."
              rows={4}
            />
            <p className="text-muted-foreground text-xs">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>

          <div className="pt-6 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Joined September 12, 2023
            </span>
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}