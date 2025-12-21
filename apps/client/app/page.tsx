import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Leaf,
  ShieldCheck,
  Lock,
  EyeOff,
  Zap,
  Calendar,
  Timer,
  PenOff,
  TrendingUp,
  Keyboard
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Quill - Welcome / Philosophy",
  description: "Zero friction. Pure focus. A digital sanctuary for your thoughts, free from judgment and the noise of the world.",
}

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      <SiteHeader />

      <main className="flex grow flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-[1024px] px-4 md:px-6">
          <div className="py-16 md:py-24 text-center">
            <div className="flex flex-col gap-8 items-center justify-center">
              <div className="flex flex-col gap-6 max-w-[800px]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground text-xs font-semibold mx-auto shadow-sm">
                  <ShieldCheck className="size-3.5 text-primary" />
                  A Safe Space for Your Mind
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-foreground">
                  Writing, stripped down to the <span className="text-primary relative inline-block">essentials<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10" preserveAspectRatio="none" viewBox="0 0 100 10"><path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path></svg></span>.
                </h1>
                <h2 className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground max-w-[640px] mx-auto">
                  Zero friction. Pure focus. A digital sanctuary for your thoughts, free from judgment and the noise of the world.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center mt-4">
                <Button className="w-full sm:w-auto min-w-[180px] h-12 text-base font-semibold shadow-lg shadow-primary/20 active:scale-[0.98] bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                  Start Writing
                </Button>
              </div>
            </div>
          </div>

          <section className="py-16 border-t border-border/60">
            <div className="flex flex-col gap-3 mb-12 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Our Philosophy</h2>
              <p className="text-muted-foreground text-lg max-w-[720px]">
                We believe writing should be an act of discovery, not performance. In a world of likes and shares, this is for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <EyeOff className="size-6" />
                </div>
                <h3 className="text-foreground text-lg font-bold mb-2">Psychological Safety</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">No one reads this but you. No judgement. Total privacy means you can be totally honest with yourself.</p>
              </Card>
              <Card className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Zap className="size-6" />
                </div>
                <h3 className="text-foreground text-lg font-bold mb-2">Zero Friction</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Don't overthink. Just type. The interface is designed to disappear so your flow state remains unbroken.</p>
              </Card>
              <Card className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Calendar className="size-6" />
                </div>
                <h3 className="text-foreground text-lg font-bold mb-2">Consistency</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Show up daily. The rest follows naturally. Build the chain, day by day, and watch your mind clarify.</p>
              </Card>
            </div>
          </section>

          <section className="py-16 border-t border-border/60">
            <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-[720px]">
                Simple rules for a complex mind. Follow the process to unlock your best writing.
              </p>
            </div>
            <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-8">
              <div className="hidden md:block absolute top-[28px] left-[60px] right-[60px] h-0.5 bg-border -z-10"></div>
              <div className="flex flex-1 flex-col md:items-center gap-6 group">
                <div className="flex items-center gap-4 md:flex-col md:gap-6">
                  <div className="relative flex items-center justify-center size-14 rounded-full bg-card border-2 border-primary text-primary z-10 shrink-0 shadow-sm ring-4 ring-primary/10">
                    <Timer className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground md:text-center">1. Set the Timer</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-center pl-[72px] md:pl-0 max-w-[300px]">
                  Commit to 5 minutes of pure flow. The timer creates a container for your focus.
                </p>
              </div>
              <div className="flex flex-1 flex-col md:items-center gap-6 group">
                <div className="flex items-center gap-4 md:flex-col md:gap-6">
                  <div className="relative flex items-center justify-center size-14 rounded-full bg-card border-2 border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors z-10 shrink-0 shadow-sm">
                    <PenOff className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground md:text-center">2. No Backspace</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-center pl-[72px] md:pl-0 max-w-[300px]">
                  Embrace mistakes. There is no editing while the timer is running. Just keep moving forward.
                </p>
              </div>
              <div className="flex flex-1 flex-col md:items-center gap-6 group">
                <div className="flex items-center gap-4 md:flex-col md:gap-6">
                  <div className="relative flex items-center justify-center size-14 rounded-full bg-card border-2 border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors z-10 shrink-0 shadow-sm">
                    <TrendingUp className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground md:text-center">3. Track & Reflect</h3>
                </div>
                <p className="text-muted-foreground text-sm md:text-center pl-[72px] md:pl-0 max-w-[300px]">
                  Visualize your progress. Review your entries only after a cooling-off period.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl bg-card rounded-3xl p-10 md:p-16 border border-border/50 shadow-lg shadow-primary/5 flex flex-col items-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 size-48 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-24 -left-24 size-48 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Keyboard className="size-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 max-w-[600px]">
                  Ready to clear your mind?
                </h2>
                <p className="text-muted-foreground mb-10 max-w-[480px] text-lg">
                  The blank page is waiting. No pressure, just words. It's safe here.
                </p>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    I understand. Let's begin.
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}