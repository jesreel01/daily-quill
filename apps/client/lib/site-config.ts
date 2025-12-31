export const siteConfig = {
  name: "Daily Quill",
  description:
    "Zero friction. Pure focus. A digital sanctuary for your thoughts, free from judgment and the noise of the world.",
  url: "https://dailyquill.app",
  ogImage: "https://dailyquill.app/og.png",
  creator: "@dailyquill",
  keywords: [
    "daily writing",
    "journaling",
    "writing habit",
    "focus writing",
    "distraction-free writing",
    "personal journal",
    "writing prompts",
    "mindfulness writing",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
