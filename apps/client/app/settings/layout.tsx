import { AppHeader } from "@/components/app-header";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground h-screen flex flex-col overflow-hidden">
      <AppHeader />
      <div className="flex flex-1 w-full pt-[65px] overflow-hidden">
        <SettingsSidebar />
        <main className="flex-1 p-6 lg:p-12 lg:pr-24 overflow-y-auto">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
