"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ChevronRight,
    ChevronLeft,
    Flame,
    BookOpen,
    TrendingUp,
    Trophy,
    Calendar,
    Check,
    PenTool,
    Share,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppHeader } from "@/components/app-header";
import { analyticsService, type UserStats } from "@/services/analytics.service";
import { gamificationService, type UserBadge } from "@/services/gamification.service";
import { writingService, type Entry } from "@/services/writing.service";

export default function DashboardPage() {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [userBadges, setUserBadges] = useState<UserBadge[]>([]);

    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        async function loadData() {
            try {
                const [statsData, badgesData, , entriesData] = await Promise.all([
                    analyticsService.getStats(),
                    gamificationService.getMyBadges(),
                    gamificationService.getAllBadges(),
                    writingService.getEntries(),
                ]);
                setStats(statsData);
                setUserBadges(badgesData);

                setEntries(entriesData);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}k`;
        }
        return num.toString();
    };

    const getRecentEntries = () => {
        return entries
            .filter(e => e.status === 'COMPLETED')
            .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
            .slice(0, 3);
    };

    const getActivityColor = (wordCount: number) => {
        if (wordCount >= 1000) return { bg: 'bg-green-500', text: 'text-white' };
        if (wordCount >= 500) return { bg: 'bg-green-300', text: 'text-green-900' };
        return { bg: 'bg-green-100', text: 'text-green-700' };
    };

    const generateHeatmapData = () => {
        const heatmap: Record<string, number> = {};
        entries.forEach(entry => {
            if (entry.entryDate) {
                heatmap[entry.entryDate] = entry.wordCount;
            }
        });
        return heatmap;
    };

    const getHeatmapIntensity = (date: string, heatmapData: Record<string, number>) => {
        const wordCount = heatmapData[date] || 0;
        if (wordCount >= 1000) return 'bg-primary';
        if (wordCount >= 500) return 'bg-primary/80';
        if (wordCount >= 250) return 'bg-primary/50';
        if (wordCount >= 100) return 'bg-primary/20';
        if (wordCount > 0) return 'bg-primary/10';
        return 'bg-secondary';
    };

    if (isLoading) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const heatmapData = generateHeatmapData();
    const recentEntries = getRecentEntries();

    return (
        <div className="bg-background font-display antialiased min-h-screen flex flex-col overflow-x-hidden text-foreground">
            <AppHeader title="History" />

            <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 pt-20 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <nav className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
                            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-foreground">History</span>
                        </nav>
                        <h1 className="text-foreground text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Writing Consistency</h1>
                        <p className="text-muted-foreground text-base font-normal">Visualize your progress and maintain your momentum.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-lg">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground"
                            onClick={() => setSelectedYear(y => y - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-foreground font-bold px-2">{selectedYear}</span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground"
                            onClick={() => setSelectedYear(y => y + 1)}
                            disabled={selectedYear >= new Date().getFullYear()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        icon={<Flame className="h-5 w-5" />}
                        title="Current Streak"
                        value={stats?.currentStreak?.toString() || "0"}
                        unit="Days"
                    />
                    <StatsCard
                        icon={<BookOpen className="h-5 w-5" />}
                        title="Total Words"
                        value={formatNumber(stats?.totalWords || 0)}
                        trend={stats?.totalWords ? "+12%" : undefined}
                    />
                    <StatsCard
                        icon={<Trophy className="h-5 w-5" />}
                        title="Longest Streak"
                        value={stats?.longestStreak?.toString() || "0"}
                        unit="Days"
                    />
                    <StatsCard
                        icon={<Calendar className="h-5 w-5" />}
                        title="Total Entries"
                        value={stats?.totalEntries?.toString() || "0"}
                        unit="entries"
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-foreground text-lg font-bold">{selectedYear} Writing Activity</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded bg-secondary"></div>
                                    <div className="w-3 h-3 rounded bg-primary/20"></div>
                                    <div className="w-3 h-3 rounded bg-primary/50"></div>
                                    <div className="w-3 h-3 rounded bg-primary/80"></div>
                                    <div className="w-3 h-3 rounded bg-primary"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto pb-2">
                            <div className="min-w-[700px] flex flex-col gap-1">
                                <div className="flex text-[10px] text-muted-foreground mb-1 pl-8">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                        <span key={m} className="flex-1">{m}</span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <div className="flex flex-col justify-between text-[10px] text-muted-foreground py-1 h-[140px]">
                                        <span>Mon</span>
                                        <span>Wed</span>
                                        <span>Fri</span>
                                    </div>

                                    <div className="grid grid-rows-7 grid-flow-col gap-1 flex-1 h-[140px]">
                                        {Array.from({ length: 366 }).map((_, i) => {
                                            const date = new Date(selectedYear, 0, i + 1);
                                            const dateStr = date.toISOString().split('T')[0];
                                            const intensity = getHeatmapIntensity(dateStr, heatmapData);
                                            const wordCount = heatmapData[dateStr] || 0;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`w-3 h-3 rounded-sm ${intensity} hover:ring-1 hover:ring-ring transition-all cursor-pointer`}
                                                    title={`${dateStr}: ${wordCount} words`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-foreground font-semibold">Recent Activity</h4>
                                <Button variant="link" className="text-xs text-primary font-medium hover:underline p-0 h-auto">View All</Button>
                            </div>
                            <div className="space-y-3">
                                {recentEntries.length > 0 ? (
                                    recentEntries.map(entry => {
                                        const colors = getActivityColor(entry.wordCount);
                                        const day = new Date(entry.entryDate).getDate().toString();
                                        return (
                                            <ActivityItem
                                                key={entry.id}
                                                day={day}
                                                color={colors.bg}
                                                textColor={colors.text}
                                                title={`${entry.wordCount} words`}
                                                meta={new Date(entry.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            />
                                        );
                                    })
                                ) : (
                                    <p className="text-muted-foreground text-sm">No completed entries yet. Start writing!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-64 flex flex-col gap-6">
                        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                            <h3 className="text-foreground text-sm font-bold px-2 py-1 mb-1">Year</h3>
                            <Button 
                                className="w-full justify-between bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => setSelectedYear(new Date().getFullYear())}
                            >
                                <span>{new Date().getFullYear()}</span>
                                {selectedYear === new Date().getFullYear() && <Check className="h-4 w-4" />}
                            </Button>
                            {[new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3].map(year => (
                                <Button 
                                    key={year} 
                                    variant="ghost" 
                                    className="w-full justify-between text-muted-foreground hover:text-foreground"
                                    onClick={() => setSelectedYear(year)}
                                >
                                    <span>{year}</span>
                                    {selectedYear === year && <Check className="h-4 w-4" />}
                                </Button>
                            ))}
                        </div>

                        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
                            <h3 className="text-foreground text-sm font-bold">Achievements</h3>
                            {userBadges.length > 0 ? (
                                userBadges.map(ub => (
                                    <div key={ub.badge.id} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                                            <Flame className="text-white h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-foreground text-sm font-bold">{ub.badge.name}</p>
                                            <p className="text-xs text-muted-foreground">{ub.badge.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex gap-4 items-center opacity-60">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                                            <Flame className="text-muted-foreground h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-foreground text-sm font-bold">On Fire!</p>
                                            <p className="text-xs text-muted-foreground">30 Day Streak</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center opacity-60">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                                            <PenTool className="text-muted-foreground h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-foreground text-sm font-bold">Wordsmith</p>
                                            <p className="text-xs text-muted-foreground">Write 500k words</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <Button variant="outline" className="w-full py-6 text-foreground border-border hover:bg-muted font-medium flex gap-2">
                            <Share className="h-5 w-5" />
                            Share Stats
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ icon, title, value, unit, trend }: { icon: React.ReactNode, title: string, value: string, unit?: string, trend?: string }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-5 border border-border bg-card group hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <p className="text-sm font-medium uppercase tracking-wider">{title}</p>
            </div>
            <div className="flex items-baseline gap-2">
                <p className="text-foreground text-3xl font-bold">{value}</p>
                {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
                {trend && (
                    <span className="text-primary text-sm font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

function ActivityItem({ day, color, textColor, title, meta }: { day: string, color: string, textColor: string, title: string, meta: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center ${textColor} font-bold`}>
                    {day}
                </div>
                <div>
                    <p className="text-foreground text-sm font-medium">{title}</p>
                    <p className="text-muted-foreground text-xs">{meta}</p>
                </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
    );
}