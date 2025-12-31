export default function AppearanceSettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          Appearance
        </h1>
        <p className="text-muted-foreground text-base">
          Customize the interface theme and your writing environment.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Interface Theme
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="cursor-pointer group">
            <input
              defaultChecked
              className="sr-only peer"
              name="theme"
              type="radio"
            />
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 h-full peer-checked:border-primary peer-checked:bg-primary/5 shadow-sm transition-all hover:border-muted-foreground">
              <div className="w-full aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden relative">
                <div className="absolute left-2 top-2 w-12 h-full bg-card border-r border-border" />
                <div className="absolute right-0 top-0 w-full h-4 bg-card border-b border-border" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Light</span>
                <div className="size-4 rounded-full border border-border peer-checked:border-primary peer-checked:bg-primary group-hover:border-primary" />
              </div>
            </div>
          </label>

          <label className="cursor-pointer group">
            <input className="sr-only peer" name="theme" type="radio" />
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 h-full peer-checked:border-primary peer-checked:bg-primary/5 shadow-sm transition-all hover:border-muted-foreground">
              <div className="w-full aspect-video bg-zinc-900 rounded-lg border border-zinc-700 flex items-center justify-center overflow-hidden relative">
                <div className="absolute left-2 top-2 w-12 h-full bg-zinc-800 border-r border-zinc-700" />
                <div className="absolute right-0 top-0 w-full h-4 bg-zinc-800 border-b border-zinc-700" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Dark</span>
                <div className="size-4 rounded-full border border-border peer-checked:border-primary peer-checked:bg-primary group-hover:border-primary" />
              </div>
            </div>
          </label>

          <label className="cursor-pointer group">
            <input className="sr-only peer" name="theme" type="radio" />
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 h-full peer-checked:border-primary peer-checked:bg-primary/5 shadow-sm transition-all hover:border-muted-foreground">
              <div className="w-full aspect-video bg-gradient-to-br from-secondary to-zinc-900 rounded-lg border border-border flex items-center justify-center overflow-hidden relative">
                <span className="text-muted-foreground text-3xl">⚙️</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">System</span>
                <div className="size-4 rounded-full border border-border peer-checked:border-primary peer-checked:bg-primary group-hover:border-primary" />
              </div>
            </div>
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Editor Typography
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <label className="text-foreground font-bold text-base">
                Font Family
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input
                    defaultChecked
                    className="peer sr-only"
                    name="font"
                    type="radio"
                  />
                  <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg border border-border bg-card hover:bg-secondary peer-checked:bg-primary/5 peer-checked:border-primary peer-checked:text-primary transition-all">
                    <span className="text-xl font-sans mb-1">Aa</span>
                    <span className="text-xs font-medium">Sans</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="font" type="radio" />
                  <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg border border-border bg-card hover:bg-secondary peer-checked:bg-primary/5 peer-checked:border-primary peer-checked:text-primary transition-all">
                    <span className="text-xl font-serif mb-1">Aa</span>
                    <span className="text-xs font-medium">Serif</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="font" type="radio" />
                  <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg border border-border bg-card hover:bg-secondary peer-checked:bg-primary/5 peer-checked:border-primary peer-checked:text-primary transition-all">
                    <span className="text-xl font-mono mb-1">Aa</span>
                    <span className="text-xs font-medium">Mono</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-foreground font-bold text-base">
                  Font Size
                </label>
                <span className="text-muted-foreground text-sm font-mono">
                  16px
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-xs">A</span>
                <input
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  max="24"
                  min="12"
                  step="1"
                  type="range"
                  defaultValue="16"
                />
                <span className="text-foreground text-lg">A</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col gap-3">
            <span className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">
              Preview
            </span>
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <p className="text-foreground leading-relaxed">
                The creative process is a journey of discovery. Every word you
                write brings you closer to clarity, understanding, and the story
                you were meant to tell. Consistency is the key that unlocks the
                door to your potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 pb-20">
        <h3 className="text-foreground text-lg font-semibold border-b border-border pb-2">
          Visual Customization
        </h3>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-bold">
                Accent Color
              </p>
              <p className="text-muted-foreground text-sm">
                Choose the primary color for buttons and highlights.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="size-8 rounded-full bg-green-600 ring-2 ring-offset-2 ring-green-600 cursor-pointer hover:scale-105 transition-transform" />
              <button className="size-8 rounded-full bg-blue-600 hover:ring-2 hover:ring-offset-2 hover:ring-blue-600 cursor-pointer hover:scale-105 transition-transform" />
              <button className="size-8 rounded-full bg-purple-600 hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 cursor-pointer hover:scale-105 transition-transform" />
              <button className="size-8 rounded-full bg-rose-600 hover:ring-2 hover:ring-offset-2 hover:ring-rose-600 cursor-pointer hover:scale-105 transition-transform" />
              <button className="size-8 rounded-full bg-amber-500 hover:ring-2 hover:ring-offset-2 hover:ring-amber-500 cursor-pointer hover:scale-105 transition-transform" />
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📐</span>
                <p className="text-foreground text-base font-bold">
                  Full Width Editor
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Remove max-width constraints on the writing area.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}