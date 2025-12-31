export default function GeneralSettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          General Settings
        </h1>
        <p className="text-muted-foreground text-base">
          Manage your core writing preferences and account settings.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Writing Goals
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-foreground text-base font-bold">
                  Daily Word Goal
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Set a realistic target to build consistency.
                </p>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-bold font-mono border border-primary/20">
                500 words
              </div>
            </div>
            <div className="relative w-full h-6 flex items-center group cursor-pointer">
              <div className="absolute w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[32%] rounded-l-full" />
              </div>
              <div className="absolute left-[32%] size-5 bg-card rounded-full shadow-md border-2 border-primary transform -translate-x-1/2 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>100</span>
              <span>2500</span>
              <span>5000+</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl">💡</span>
              <p className="text-foreground text-base font-bold">
                Daily Prompts
              </p>
            </div>
            <p className="text-muted-foreground text-sm max-w-lg">
              Receive a thought-provoking prompt every morning to help you
              overcome writer&apos;s block.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Regional & Reminders
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">Time Zone</p>
              <p className="text-muted-foreground text-sm">
                Used for reminders and daily streaks.
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all">
                <option>Pacific Time (US & Canada)</option>
                <option>Eastern Time (US & Canada)</option>
                <option>UTC</option>
                <option>London</option>
              </select>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-foreground text-base font-bold">
                  Daily Reminder
                </p>
                <p className="text-muted-foreground text-sm">
                  Get a gentle nudge if you haven&apos;t written by your
                  selected time.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
            <div className="flex flex-col gap-2 opacity-50 pointer-events-none select-none">
              <label className="text-muted-foreground text-sm font-medium">
                Reminder Time
              </label>
              <div className="relative max-w-[200px]">
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  type="time"
                  defaultValue="08:00"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}