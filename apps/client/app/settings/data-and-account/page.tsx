import { Download, AlertTriangle } from "lucide-react";

export default function DataAndAccountSettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          Data & Account
        </h1>
        <p className="text-muted-foreground text-base">
          Manage your personal data, export your writing history, or close your
          account.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Export Content
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-foreground text-base font-bold">
                Export all data
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                Download a copy of your personal data, including all journal
                entries, word count history, and settings preferences. Data is
                exported in a JSON format that is machine-readable and easy to
                parse.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-5 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium rounded-lg border border-border transition-colors flex items-center gap-2 shadow-sm">
                <Download className="size-4" />
                Download Archive
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 pb-20">
        <h3 className="text-destructive text-lg font-semibold border-b border-destructive/30 pb-2">
          Danger Zone
        </h3>
        <div className="bg-destructive/5 border border-destructive/30 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="text-destructive text-base font-bold flex items-center gap-2">
                <AlertTriangle className="size-4" />
                Delete Account
              </h4>
              <p className="text-destructive/80 text-sm max-w-xl">
                Permanently delete your account and all associated data from our
                servers. This action is irreversible and cannot be undone.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-card hover:bg-destructive/10 text-destructive text-sm font-medium rounded-lg border border-destructive/30 transition-colors shadow-sm whitespace-nowrap">
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}