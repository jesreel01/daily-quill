"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    Cloud,
    Maximize2,
    Minimize2,
    Loader2,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";
import { writingService, type Entry, type CreateEntryPayload, type UpdateEntryPayload } from "@/services/writing.service";

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function WritePage() {
    const [content, setContent] = useState("");
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [goal] = useState(500);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSavedContentRef = useRef<string>("");

    const today = new Date().toISOString().split('T')[0];
    const todayFormatted = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    useEffect(() => {
        async function loadTodayEntry() {
            try {
                const entry = await writingService.getEntryByDate(today);
                if (entry) {
                    setCurrentEntry(entry);
                    setContent(entry.content || "");
                    lastSavedContentRef.current = entry.content;
                }
            } catch (error) {
                console.error("Failed to load entry:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadTodayEntry();
    }, [today]);

    useEffect(() => {
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        setWordCount(words);
    }, [content]);

    const saveEntry = useCallback(async (newContent: string) => {
        if (newContent === lastSavedContentRef.current) {
            return;
        }

        console.log("Saving entry...", { currentEntry, newContent });
        if (currentEntry && !currentEntry.id) {
            console.error("Current entry exists but has no ID!", currentEntry);
        }

        setSaveStatus('saving');
        const words = newContent.trim() ? newContent.trim().split(/\s+/).length : 0;
        const isCompleted = words >= goal;

        try {
            if (currentEntry?.id) {
                const updateData: UpdateEntryPayload = {
                    content: newContent,
                    wordCount: words,
                    status: isCompleted ? 'COMPLETED' : 'DRAFT',
                };
                const updated = await writingService.updateEntry(currentEntry.id, updateData);
                setCurrentEntry(updated);
            } else {
                const createData: CreateEntryPayload = {
                    content: newContent,
                    wordCount: words,
                    entryDate: today,
                    status: isCompleted ? 'COMPLETED' : 'DRAFT',
                };
                const created = await writingService.createEntry(createData);
                console.log("Created entry:", created);
                if (!created || !created.id) {
                    console.error("Created entry is missing ID!", created);
                }
                setCurrentEntry(created);
            }
            lastSavedContentRef.current = newContent;
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (error) {
            console.error("Failed to save entry:", error);
            setSaveStatus('error');
        }
    }, [currentEntry, goal, today]);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            saveEntry(newContent);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    const progress = Math.min((wordCount / goal) * 100, 100);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-theme(spacing.16))] md:h-screen flex flex-col bg-background relative overflow-hidden">
            <AppHeader
                title="Write"
                className={cn(
                    "transition-all duration-500 will-change-transform z-30",
                    isFocusMode ? "-translate-y-full" : "translate-y-0"
                )}
            />

            <main className="flex-1 flex flex-col relative overflow-hidden bg-background pt-14">
                <header
                    className={cn(
                        "w-full max-w-4xl mx-auto pt-8 pb-4 px-6 md:px-12 flex flex-col gap-6 shrink-0 z-10 transition-all duration-500",
                        isFocusMode ? "opacity-0 -translate-y-4 pointer-events-none absolute left-0 right-0" : "opacity-100 translate-y-0"
                    )}
                >
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-foreground tracking-tight text-3xl md:text-4xl font-bold leading-tight">{todayFormatted}</p>
                            <p className="text-muted-foreground text-sm font-medium">Daily Writing Goal</p>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[200px] flex-1 md:flex-none">
                            <div className="flex justify-between items-end text-xs font-medium">
                                <span className="text-primary">{Math.round(progress)}%</span>
                                <span className="text-muted-foreground">{wordCount} / {goal} words</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-500 ease-out",
                                        progress >= 100 ? "bg-green-500" : "bg-primary"
                                    )}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto relative w-full flex flex-col items-center">
                    <div className={cn(
                        "w-full max-w-3xl px-6 md:px-12 pb-32 flex flex-col flex-1 transition-all duration-500",
                        isFocusMode ? "pt-12" : ""
                    )}>
                        <div className={cn(
                            "py-6 flex justify-center opacity-80 hover:opacity-100 transition-all duration-500",
                            isFocusMode ? "opacity-0 -translate-y-4 pointer-events-none h-0 p-0 overflow-hidden" : ""
                        )}>
                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center max-w-lg">
                                <p className="text-primary text-sm font-medium mb-1">Daily Prompt</p>
                                <p className="text-foreground/80 italic leading-relaxed">
                                    &quot;What is one thing you are grateful for today, and why does it matter to you right now?&quot;
                                </p>
                            </div>
                        </div>

                        <textarea
                            className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-lg md:text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-h-[50vh]"
                            placeholder="What's on your mind today? Start writing..."
                            spellCheck="false"
                            value={content}
                            onChange={(e) => handleContentChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 pointer-events-none px-6 md:px-12 flex justify-center md:justify-end max-w-4xl mx-auto w-full z-20">
                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center gap-4 shadow-sm">
                        <div className="flex items-center gap-2 border-r border-border pr-4">
                            {saveStatus === 'saving' && (
                                <>
                                    <Loader2 className="text-muted-foreground w-[18px] h-[18px] animate-spin" />
                                    <span className="text-xs font-medium text-muted-foreground">Saving...</span>
                                </>
                            )}
                            {saveStatus === 'saved' && (
                                <>
                                    <Check className="text-green-500 w-[18px] h-[18px]" />
                                    <span className="text-xs font-medium text-green-500">Saved</span>
                                </>
                            )}
                            {(saveStatus === 'idle' || saveStatus === 'error') && (
                                <>
                                    <Cloud className={cn("w-[18px] h-[18px]", saveStatus === 'error' ? "text-destructive" : "text-primary")} />
                                    <span className={cn("text-xs font-medium", saveStatus === 'error' ? "text-destructive" : "text-muted-foreground")}>
                                        {saveStatus === 'error' ? 'Error' : (currentEntry ? 'Saved' : 'Draft')}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{wordCount} words</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full bg-primary", (content?.length || 0) > 0 ? "animate-pulse" : "")}></div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 hidden md:block z-20">
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary"
                        title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                    >
                        {isFocusMode ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                    </button>
                </div>
            </main>
        </div>
    );
}