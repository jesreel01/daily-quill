export default function NotificationsSettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          Notifications
        </h1>
        <p className="text-muted-foreground text-base">
          Manage how and when you receive notifications about your writing
          progress.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Email Notifications
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Weekly Summary
              </p>
              <p className="text-muted-foreground text-sm">
                Receive a weekly digest of your writing progress and
                achievements.
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

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Streak Milestones
              </p>
              <p className="text-muted-foreground text-sm">
                Get notified when you reach a new writing streak milestone.
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

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Product Updates
              </p>
              <p className="text-muted-foreground text-sm">
                Stay informed about new features and improvements.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Push Notifications
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Writing Reminders
              </p>
              <p className="text-muted-foreground text-sm">
                Daily browser notifications to remind you to write.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">Goal Progress</p>
              <p className="text-muted-foreground text-sm">
                Get notified when you&apos;re close to reaching your daily word goal.
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
        </div>
      </section>

      <section className="flex flex-col gap-5 pb-20">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Quiet Hours
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Enable Quiet Hours
              </p>
              <p className="text-muted-foreground text-sm">
                Pause all notifications during specified hours.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex flex-col md:flex-row gap-4 opacity-50 pointer-events-none select-none">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-muted-foreground text-sm font-medium">
                Start Time
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="time"
                defaultValue="22:00"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-muted-foreground text-sm font-medium">
                End Time
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="time"
                defaultValue="08:00"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}